import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: clinicId } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify clinic ownership
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, user_id')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (clinic.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Get current max sort order
    const { data: existingPhotos } = await supabase
      .from('clinic_photos')
      .select('sort_order')
      .eq('clinic_id', clinicId)
      .order('sort_order', { ascending: false })
      .limit(1)

    let sortOrder = (existingPhotos?.[0]?.sort_order ?? -1) + 1

    const uploadedPhotos = []

    for (const file of files) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        continue
      }

      if (file.size > 5 * 1024 * 1024) {
        continue // Skip files over 5MB
      }

      // Generate unique filename
      const ext = file.name.split('.').pop() || 'jpg'
      const filename = `${clinicId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('clinic-photos')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        console.error('Error uploading photo:', uploadError)
        continue
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('clinic-photos')
        .getPublicUrl(filename)

      // Insert photo record
      const { data: photoRecord, error: insertError } = await supabase
        .from('clinic_photos')
        .insert({
          clinic_id: clinicId,
          url: urlData.publicUrl,
          alt_text: file.name.replace(/\.[^.]+$/, ''),
          sort_order: sortOrder,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error inserting photo record:', insertError)
        continue
      }

      uploadedPhotos.push(photoRecord)
      sortOrder++
    }

    return NextResponse.json({ photos: uploadedPhotos })
  } catch (error) {
    console.error('Error uploading photos:', error)
    return NextResponse.json({ error: 'Failed to upload photos' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  // Reorder photos
  try {
    const { id: clinicId } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify clinic ownership
    const { data: clinic, error: clinicError } = await supabase
      .from('clinics')
      .select('id, user_id')
      .eq('id', clinicId)
      .single()

    if (clinicError || !clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    if (clinic.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { photoIds } = await request.json()

    if (!Array.isArray(photoIds)) {
      return NextResponse.json({ error: 'Invalid photoIds' }, { status: 400 })
    }

    // Update sort order for each photo
    for (let i = 0; i < photoIds.length; i++) {
      await supabase
        .from('clinic_photos')
        .update({ sort_order: i })
        .eq('id', photoIds[i])
        .eq('clinic_id', clinicId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering photos:', error)
    return NextResponse.json({ error: 'Failed to reorder photos' }, { status: 500 })
  }
}

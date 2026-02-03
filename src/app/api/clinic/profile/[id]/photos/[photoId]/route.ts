import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RouteParams {
  params: Promise<{ id: string; photoId: string }>
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id: clinicId, photoId } = await params
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

    // Get the photo record
    const { data: photo, error: photoError } = await supabase
      .from('clinic_photos')
      .select('id, url')
      .eq('id', photoId)
      .eq('clinic_id', clinicId)
      .single()

    if (photoError || !photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    // Extract the storage path from the URL
    const url = new URL(photo.url)
    const pathParts = url.pathname.split('/storage/v1/object/public/clinic-photos/')
    const storagePath = pathParts[1]

    // Delete from storage
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('clinic-photos')
        .remove([storagePath])

      if (storageError) {
        console.error('Error deleting from storage:', storageError)
        // Continue to delete the record even if storage delete fails
      }
    }

    // Delete the photo record
    const { error: deleteError } = await supabase
      .from('clinic_photos')
      .delete()
      .eq('id', photoId)

    if (deleteError) {
      console.error('Error deleting photo record:', deleteError)
      return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}

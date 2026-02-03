'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Save,
  Loader2,
  Upload,
  X,
  GripVertical,
  Eye,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface ClinicPhoto {
  id: string
  url: string
  alt_text: string | null
  sort_order: number
}

interface ClinicProcedure {
  id: string
  price_min: number | null
  price_max: number | null
  currency: string
  procedure: {
    id: string
    name: string
    slug: string
    category_id: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
}

interface Procedure {
  id: string
  name: string
  slug: string
  category_id: string
}

interface ProfileClientProps {
  clinic: {
    id: string
    name: string
    slug: string
    description: string | null
    address: string | null
    city: string
    country: string
    phone: string | null
    email: string | null
    website: string | null
    year_established: number | null
    languages: string[]
    accreditations: string[]
    certifications: string[]
    photos: ClinicPhoto[]
    clinic_procedures: ClinicProcedure[]
    clinic_categories: Array<{ id: string; category: Category }>
  }
  categories: Category[]
  procedures: Procedure[]
}

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Arabic',
  'Chinese',
  'Japanese',
  'Korean',
  'Turkish',
  'Thai',
  'Hindi',
]

const ACCREDITATIONS = [
  'JCI (Joint Commission International)',
  'ISO 9001',
  'ISO 14001',
  'TEMOS',
  'AACI (American Accreditation Commission International)',
  'GHA (Global Healthcare Accreditation)',
  'DNV GL',
  'NABH (National Accreditation Board for Hospitals)',
]

const COUNTRIES = [
  'Turkey',
  'Thailand',
  'Mexico',
  'India',
  'Spain',
  'Portugal',
  'Poland',
  'Hungary',
  'Czech Republic',
  'Germany',
  'United Kingdom',
  'Brazil',
  'Colombia',
  'Costa Rica',
  'South Korea',
  'Malaysia',
  'Singapore',
  'United Arab Emirates',
]

interface CollapsibleSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function CollapsibleSection({ title, defaultOpen = true, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border-b border-neutral-200 px-6 py-4"
      >
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-neutral-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-500" />
        )}
      </button>
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  )
}

export function ProfileClient({ clinic, categories, procedures }: ProfileClientProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: clinic.name,
    description: clinic.description || '',
    address: clinic.address || '',
    city: clinic.city,
    country: clinic.country,
    phone: clinic.phone || '',
    email: clinic.email || '',
    website: clinic.website || '',
    yearEstablished: clinic.year_established?.toString() || '',
    languages: clinic.languages || [],
    accreditations: clinic.accreditations || [],
  })

  const [photos, setPhotos] = useState<ClinicPhoto[]>(clinic.photos || [])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    clinic.clinic_categories?.map((cc) => cc.category.id) || []
  )
  const [clinicProcedures, setClinicProcedures] = useState<
    Array<{ procedureId: string; priceMin: string; priceMax: string; currency: string }>
  >(
    clinic.clinic_procedures?.map((cp) => ({
      procedureId: cp.procedure.id,
      priceMin: cp.price_min?.toString() || '',
      priceMax: cp.price_max?.toString() || '',
      currency: cp.currency || 'EUR',
    })) || []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const toggleAccreditation = (accreditation: string) => {
    setFormData((prev) => ({
      ...prev,
      accreditations: prev.accreditations.includes(accreditation)
        ? prev.accreditations.filter((a) => a !== accreditation)
        : [...prev.accreditations, accreditation],
    }))
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    )
  }

  const addProcedure = () => {
    setClinicProcedures((prev) => [
      ...prev,
      { procedureId: '', priceMin: '', priceMax: '', currency: 'EUR' },
    ])
  }

  const updateProcedure = (index: number, field: string, value: string) => {
    setClinicProcedures((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    )
  }

  const removeProcedure = (index: number) => {
    setClinicProcedures((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append('files', file))

      const res = await fetch(`/api/clinic/profile/${clinic.id}/photos`, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { photos: newPhotos } = await res.json()
        setPhotos((prev) => [...prev, ...newPhotos])
      }
    } catch (error) {
      console.error('Error uploading photos:', error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handlePhotoDelete = async (photoId: string) => {
    try {
      const res = await fetch(`/api/clinic/profile/${clinic.id}/photos/${photoId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId))
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const res = await fetch(`/api/clinic/profile/${clinic.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          yearEstablished: formData.yearEstablished ? parseInt(formData.yearEstablished) : null,
          categoryIds: selectedCategories,
          procedures: clinicProcedures.filter((p) => p.procedureId),
        }),
      })

      if (res.ok) {
        setSaveMessage({ type: 'success', text: 'Profile saved successfully!' })
        router.refresh()
      } else {
        const data = await res.json()
        setSaveMessage({ type: 'error', text: data.error || 'Failed to save profile' })
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      setSaveMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = () => {
    window.open(`/clinics/${clinic.slug}`, '_blank')
  }

  // Get available procedures for selected categories
  const availableProcedures = procedures.filter(
    (p) => selectedCategories.includes(p.category_id)
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Clinic Profile</h1>
          <p className="mt-1 text-neutral-600">
            Manage your public profile and clinic information.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage && (
            <span
              className={cn(
                'text-sm',
                saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {saveMessage.text}
            </span>
          )}
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Basic Info */}
      <CollapsibleSection title="Basic Information">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Clinic Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Enter clinic name"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="City"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Full Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Street address"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Year Established
            </label>
            <input
              type="number"
              name="yearEstablished"
              value={formData.yearEstablished}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:max-w-[200px]"
              placeholder="e.g., 2010"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Tell patients about your clinic..."
            />
            <p className="mt-1 text-sm text-neutral-500">
              {formData.description.length}/2000 characters
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Photos */}
      <CollapsibleSection title="Photos">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={photo.url}
                  alt={photo.alt_text || 'Clinic photo'}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => handlePhotoDelete(photo.id)}
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-neutral-600 opacity-0 transition-opacity hover:bg-white hover:text-red-600 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute left-2 top-2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-5 w-5 text-white drop-shadow" />
                </div>
              </div>
            ))}
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-8 py-12 text-center transition-colors hover:border-primary-400 hover:bg-primary-50"
          >
            {isUploading ? (
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-500" />
            ) : (
              <>
                <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                <p className="mt-2 text-neutral-500">Drag and drop photos here, or click to browse</p>
                <p className="mt-1 text-sm text-neutral-400">
                  PNG, JPG up to 5MB. Recommended: 1200x800px
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </CollapsibleSection>

      {/* Categories */}
      <CollapsibleSection title="Specialties">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Select the medical specialties your clinic offers.
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  selectedCategories.includes(category.id)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                )}
              >
                {category.icon && <span>{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Procedures & Prices */}
      <CollapsibleSection title="Procedures & Prices">
        <div className="space-y-4">
          {selectedCategories.length === 0 ? (
            <p className="text-neutral-500">Select specialties above to add procedures.</p>
          ) : (
            <>
              <div className="space-y-3">
                {clinicProcedures.map((proc, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 p-4">
                    <select
                      value={proc.procedureId}
                      onChange={(e) => updateProcedure(index, 'procedureId', e.target.value)}
                      className="min-w-[200px] flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    >
                      <option value="">Select procedure</option>
                      {availableProcedures.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={proc.priceMin}
                        onChange={(e) => updateProcedure(index, 'priceMin', e.target.value)}
                        placeholder="Min"
                        className="w-24 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                      />
                      <span className="text-neutral-400">-</span>
                      <input
                        type="number"
                        value={proc.priceMax}
                        onChange={(e) => updateProcedure(index, 'priceMax', e.target.value)}
                        placeholder="Max"
                        className="w-24 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                      />
                      <select
                        value={proc.currency}
                        onChange={(e) => updateProcedure(index, 'currency', e.target.value)}
                        className="w-20 rounded-lg border border-neutral-200 px-2 py-2 text-sm"
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                    <button
                      onClick={() => removeProcedure(index)}
                      className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addProcedure}>
                <Plus className="mr-2 h-4 w-4" />
                Add Procedure
              </Button>
            </>
          )}
        </div>
      </CollapsibleSection>

      {/* Languages */}
      <CollapsibleSection title="Languages Spoken">
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map((language) => (
            <button
              key={language}
              onClick={() => toggleLanguage(language)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                formData.languages.includes(language)
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              )}
            >
              {language}
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Accreditations */}
      <CollapsibleSection title="Accreditations & Certifications">
        <div className="space-y-3">
          {ACCREDITATIONS.map((accreditation) => (
            <label
              key={accreditation}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={formData.accreditations.includes(accreditation)}
                onChange={() => toggleAccreditation(accreditation)}
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{accreditation}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Contact Info */}
      <CollapsibleSection title="Contact Information">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="clinic@email.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="https://www.yourclinic.com"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Floating Save Button (mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={isSaving}
          className="shadow-lg"
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save
        </Button>
      </div>
    </div>
  )
}

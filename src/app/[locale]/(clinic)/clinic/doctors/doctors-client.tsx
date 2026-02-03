'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  GraduationCap,
  Clock,
  Globe,
} from 'lucide-react'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

interface Doctor {
  id: string
  name: string
  title: string | null
  specialisation: string | null
  qualifications: string[]
  years_experience: number | null
  languages: string[]
  bio: string | null
  photo_url: string | null
}

interface DoctorsClientProps {
  doctors: Doctor[]
  clinicId: string
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
  'Turkish',
  'Thai',
]

const SPECIALISATIONS = [
  'Plastic Surgery',
  'Cosmetic Dentistry',
  'Hair Transplant',
  'Ophthalmology',
  'Orthopedic Surgery',
  'Cardiology',
  'Dermatology',
  'Fertility',
  'Bariatric Surgery',
  'General Surgery',
]

interface DoctorFormData {
  name: string
  title: string
  specialisation: string
  qualifications: string[]
  yearsExperience: string
  languages: string[]
  bio: string
  photoUrl: string
}

const emptyFormData: DoctorFormData = {
  name: '',
  title: '',
  specialisation: '',
  qualifications: [],
  yearsExperience: '',
  languages: [],
  bio: '',
  photoUrl: '',
}

export function DoctorsClient({ doctors: initialDoctors, clinicId }: DoctorsClientProps) {
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [formData, setFormData] = useState<DoctorFormData>(emptyFormData)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [qualificationInput, setQualificationInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('')

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialisation?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = !filterSpecialty || doctor.specialisation === filterSpecialty

    return matchesSearch && matchesSpecialty
  })

  const uniqueSpecialties = [...new Set(doctors.map((d) => d.specialisation).filter(Boolean))]

  const openAddModal = () => {
    setEditingDoctor(null)
    setFormData(emptyFormData)
    setIsModalOpen(true)
  }

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setFormData({
      name: doctor.name,
      title: doctor.title || '',
      specialisation: doctor.specialisation || '',
      qualifications: doctor.qualifications || [],
      yearsExperience: doctor.years_experience?.toString() || '',
      languages: doctor.languages || [],
      bio: doctor.bio || '',
      photoUrl: doctor.photo_url || '',
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingDoctor(null)
    setFormData(emptyFormData)
    setQualificationInput('')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const addQualification = () => {
    if (qualificationInput.trim() && !formData.qualifications.includes(qualificationInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, qualificationInput.trim()],
      }))
      setQualificationInput('')
    }
  }

  const removeQualification = (qual: string) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((q) => q !== qual),
    }))
  }

  const handleSave = async () => {
    if (!formData.name.trim()) return

    setIsSaving(true)
    try {
      const url = editingDoctor
        ? `/api/clinic/doctors/${editingDoctor.id}`
        : '/api/clinic/doctors'

      const method = editingDoctor ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId,
          ...formData,
          yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : null,
        }),
      })

      if (res.ok) {
        const { doctor } = await res.json()
        if (editingDoctor) {
          setDoctors((prev) =>
            prev.map((d) => (d.id === editingDoctor.id ? doctor : d))
          )
        } else {
          setDoctors((prev) => [...prev, doctor])
        }
        closeModal()
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving doctor:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (doctorId: string) => {
    if (!confirm('Are you sure you want to remove this doctor?')) return

    setIsDeleting(doctorId)
    try {
      const res = await fetch(`/api/clinic/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clinicId }),
      })

      if (res.ok) {
        setDoctors((prev) => prev.filter((d) => d.id !== doctorId))
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting doctor:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Doctors</h1>
            <p className="mt-1 text-neutral-600">
              Manage your team of medical professionals.
            </p>
          </div>
          <Button variant="primary" onClick={openAddModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Specialties</option>
            {uniqueSpecialties.map((specialty) => (
              <option key={specialty} value={specialty || ''}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Cards */}
        {filteredDoctors.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-2xl font-semibold text-primary-600">
                    {doctor.photo_url ? (
                      <img
                        src={doctor.photo_url}
                        alt={doctor.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      doctor.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900">{doctor.name}</h3>
                    {doctor.title && (
                      <p className="text-sm text-neutral-500">{doctor.title}</p>
                    )}
                    {doctor.specialisation && (
                      <span className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                        {doctor.specialisation}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2">
                  {doctor.years_experience && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="h-4 w-4 text-neutral-400" />
                      {doctor.years_experience} years experience
                    </div>
                  )}
                  {doctor.qualifications && doctor.qualifications.length > 0 && (
                    <div className="flex items-start gap-2 text-sm text-neutral-600">
                      <GraduationCap className="mt-0.5 h-4 w-4 text-neutral-400" />
                      <span className="line-clamp-2">
                        {doctor.qualifications.join(', ')}
                      </span>
                    </div>
                  )}
                  {doctor.languages && doctor.languages.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Globe className="h-4 w-4 text-neutral-400" />
                      {doctor.languages.slice(0, 3).join(', ')}
                      {doctor.languages.length > 3 && ` +${doctor.languages.length - 3}`}
                    </div>
                  )}
                </div>

                {doctor.bio && (
                  <p className="mt-3 text-sm text-neutral-600 line-clamp-2">{doctor.bio}</p>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2 border-t border-neutral-100 pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(doctor)}
                  >
                    <Edit2 className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDelete(doctor.id)}
                    disabled={isDeleting === doctor.id}
                  >
                    {isDeleting === doctor.id ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-1 h-4 w-4" />
                    )}
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-3xl">
                👨‍⚕️
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">No doctors added yet</h3>
              <p className="mt-2 max-w-md mx-auto text-neutral-500">
                Add your medical team to help patients learn about your clinic&apos;s expertise.
              </p>
              <div className="mt-6">
                <Button variant="primary" onClick={openAddModal}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Doctor
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
            <p className="text-neutral-500">No doctors match your search criteria.</p>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
              />
              <m.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="e.g., MD, FACS, Chief Surgeon"
                    />
                  </div>

                  {/* Specialisation */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Specialisation
                    </label>
                    <select
                      name="specialisation"
                      value={formData.specialisation}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="">Select specialisation</option>
                      {SPECIALISATIONS.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Years Experience */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="e.g., 15"
                      min="0"
                      max="60"
                    />
                  </div>

                  {/* Qualifications */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Qualifications
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={qualificationInput}
                        onChange={(e) => setQualificationInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                        className="flex-1 rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="e.g., Board Certified"
                      />
                      <Button variant="outline" onClick={addQualification}>
                        Add
                      </Button>
                    </div>
                    {formData.qualifications.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.qualifications.map((qual) => (
                          <span
                            key={qual}
                            className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm"
                          >
                            {qual}
                            <button
                              onClick={() => removeQualification(qual)}
                              className="text-neutral-400 hover:text-neutral-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map((language) => (
                        <button
                          key={language}
                          type="button"
                          onClick={() => toggleLanguage(language)}
                          className={cn(
                            'rounded-full border px-3 py-1 text-sm transition-colors',
                            formData.languages.includes(language)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                          )}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Biography
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Brief description of experience and expertise..."
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3 justify-end">
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={!formData.name.trim() || isSaving}
                  >
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingDoctor ? 'Save Changes' : 'Add Doctor'}
                  </Button>
                </div>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}

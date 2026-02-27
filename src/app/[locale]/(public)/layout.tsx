import { PublicHeader } from '@/components/layout/public-header'
import { Footer } from '@/components/layout/footer'
import { getUserProfile } from '@/lib/auth/actions'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userProfile = await getUserProfile()

  return (
    <>
      <PublicHeader user={userProfile} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

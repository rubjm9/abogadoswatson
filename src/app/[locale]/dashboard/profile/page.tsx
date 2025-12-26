import { getProfile } from "@/actions/profile"
import { ProfileForm } from "@/components/profile/profile-form"

export default async function ProfilePage() {
    const profile = await getProfile()

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Perfil</h2>
                <p className="text-slate-500">Gestiona tu información personal y de contacto.</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-8 bg-white">
                <ProfileForm initialData={profile} />
            </div>
        </div>
    )
}

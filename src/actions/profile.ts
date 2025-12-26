"use server"

export interface ProfileData {
    name: string
    email: string
    role: string
    phone: string
    bio: string
}

const MOCK_PROFILE: ProfileData = {
    name: "Dr. Watson",
    email: "watson@abogados.com",
    role: "Senior Attorney",
    phone: "+34 600 000 000",
    bio: "Specializing in international law and immigration.",
}

export async function getProfile() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_PROFILE
}

export async function updateProfile(data: ProfileData) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Updating profile:", data)
    return data
}

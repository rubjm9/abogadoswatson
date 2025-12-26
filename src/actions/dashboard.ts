"use server"

export async function getDashboardStats() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
        activeCases: 12,
        pendingActions: 5,
        upcomingHearings: 2,
        totalClients: 48,
    }
}

export async function getRecentActivity() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
        {
            id: "1",
            user: "Client A",
            action: "Uploaded document",
            target: "Case #1234",
            timestamp: "2 hours ago",
        },
        {
            id: "2",
            user: "Attorney Watson",
            action: "Updated status",
            target: "Case #5678",
            timestamp: "5 hours ago",
        },
        {
            id: "3",
            user: "System",
            action: "Reminder sent",
            target: "Case #9012",
            timestamp: "1 day ago",
        },
    ]
}

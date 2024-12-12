export async function getTokenFromKey(apiUrl: string, apiKey: string, userId: string, userName: string, userMetadata: string) {
    try {
        const url = `${apiUrl}/api/v1/Keys/user/token/jwt?apiKey=${encodeURIComponent(apiKey)}&userId=${encodeURIComponent(userId)}&userName=${encodeURIComponent(userName)}&userMetadata=${encodeURIComponent(userMetadata)}`;
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('request error:', error);
    }
}

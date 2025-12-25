export const cloudinaryService = {
    async uploadImage(formData: FormData) {
        try {
            const cloudName = "dnhvevueu"

            formData.append("upload_preset", "ml_default")

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            )

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            const data = await response.json()

            return {
                url: data.secure_url,
                publicId: data.public_id,
            }
        } catch (error) {
            throw new Error(`Houve um erro ao gerar imagem: ${error}`)
        }
    },
}
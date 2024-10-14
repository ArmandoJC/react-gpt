import type { OrthographyResponse } from "../../interfaces";


export const orthographyUseCase = async (prompt: string) => {



    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!resp.ok) {
            throw new Error(`No se pudo realizar la corrección`)
        }

        const data = await resp.json() as OrthographyResponse;
        console.log({ data })

        return {
            ok: true,
            ...data,
        }

    } catch (error) {
        // const errors: string[] = []
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: 'No se pudo realizar la corrección'

        }
    }
}
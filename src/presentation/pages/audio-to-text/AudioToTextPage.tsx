import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from '../../components';
import { audioToTextUseCase } from '../../../core/use-cases';

interface Message {
    text: string;
    isGpt: boolean;
}




export const AudioToTextPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])


    const handlePost = async (text: string, audioFile: File) => {

        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGpt: false }]);

        //TODO: UseCase
        const resp = await audioToTextUseCase(audioFile, text)
        setIsLoading(false);
        if (!resp) return;

        console.log({ resp })

        // Todo: Añadir el mensaje de isGPT en true


    }



    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage text="Qué audio quieres generar hoy?" />

                    {
                        messages.map((message, index) => (
                            message.isGpt
                                ? (
                                    <GptMessage key={index} text="Esto es de OpenAI" />
                                )
                                : (
                                    <MyMessage key={index} text={message.text} />
                                )

                        ))
                    }


                    {
                        isLoading && (
                            <div className="col-start-1 col-end-12 fade-in">
                                <TypingLoader />
                            </div>
                        )
                    }


                </div>
            </div>


            <TextMessageBoxFile
                onSendMessage={handlePost}
                placeholder='Escribe aquí lo que deseas'
                disableCorrections
                accept='audio/*'

            />

        </div>
    );
};
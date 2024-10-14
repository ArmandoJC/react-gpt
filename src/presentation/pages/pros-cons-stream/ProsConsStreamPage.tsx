import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components';
import { prosConsStreamUseCase } from '../../../core/use-cases';

interface Message {
    text: string;
    isGpt: boolean;
}




export const ProsConsStreamPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])


    const handlePost = async (text: string) => {

        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGpt: false }]);

        //TODO: UseCase
        await prosConsStreamUseCase(text)

        setIsLoading(false);

        // Todo: Añadir el mensaje de isGPT en true


    }



    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    {/* Bienvenida */}
                    <GptMessage text="¿Qué deseas comparar hoy?" />

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


            <TextMessageBox
                onSendMessage={handlePost}
                placeholder='Escribe aquí lo que deseas'
                disableCorrections
            />

        </div>
    );
};
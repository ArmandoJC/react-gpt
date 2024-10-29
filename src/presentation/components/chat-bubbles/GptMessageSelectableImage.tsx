
interface Props {
    text: string;
    imageUrl: string;
    alt: string;

    // No lo voy a necesitar
    onImageSelected?: (imageUrl: string) => void
}

export const GptMessageSelectableImage = ({ imageUrl }: Props) => {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                    B
                </div>
                <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                    {/* <span>{text}</span> */}
                    <h1>Hola mundo</h1>
                    {/* <img
                        src={imageUrl}
                        alt={alt}
                        className="rounded-xl w-96 h-96 object-cover"
                        onClick={() => onImageSelected && onImageSelected(imageUrl)}
                    /> */}
                </div>
            </div>
        </div>
    )
}

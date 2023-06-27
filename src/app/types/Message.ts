interface IMessage{
    id: number;
    username: string;
    userID: string;
    chatID: string;
    content?: string;
    created : number,
    type: 'message' | 'image';
}

interface ISendingMessage{
    event: React.FormEvent;

}
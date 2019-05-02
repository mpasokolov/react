import {normalize, schema} from 'normalizr';

export const getNormalizedData = (data)  => {
    const newData = {chats: data};
    const chats = new schema.Entity('chats');
    const mySchema = { chats: [ chats ] };

    return normalize(newData, mySchema);
}
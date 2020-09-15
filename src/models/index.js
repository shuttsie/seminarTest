// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, User, Chatty } = initSchema(schema);

export {
  Note,
  User,
  Chatty
};
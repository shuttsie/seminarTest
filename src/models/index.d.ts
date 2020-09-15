import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Note {
  readonly id: string;
  readonly note: string;
  constructor(init: ModelInit<Note>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

export declare class User {
  readonly id: string;
  readonly Created?: string;
  readonly address: string;
  readonly email: string;
  readonly given_name: string;
  readonly locale: string;
  readonly middle_name: string;
  readonly name: string;
  readonly nickname: string;
  readonly username?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Chatty {
  readonly id: string;
  readonly user: string;
  readonly message: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Chatty>);
  static copyOf(source: Chatty, mutator: (draft: MutableModel<Chatty>) => MutableModel<Chatty> | void): Chatty;
}
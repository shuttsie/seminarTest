import React from 'react'
import { Link } from 'gatsby'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { getCurrentUser } from '../utils/auth'
import { createChat, deleteChat, updateChat } from '../graphql/mutations'
import { listChats } from '../graphql/queries'
import {
  onCreateChat,
  onDeleteChat,
  onUpdateChat,
} from '../graphql/subscriptions'

const user = getCurrentUser()

class Chat extends React.Component {
  state = {
    id: '',
    chat: '',
    chats: [],
  }

  getUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    return user
  }

  componentDidMount() {
    this.getChats()

    this.createChatListener = this.getUser().then(user => {
      API.graphql(
        graphqlOperation(onCreateChat, {
          owner: user.username,
        })
      ).subscribe({
        next: chatData => {
          const newChat = chatData.value.data.onCreateChat
          const prevChats = this.state.chats.filter(
            chat => chat.id !== newChat.id
          )
          const updatedChats = [...prevChats, newChat]
          this.setState({ chats: updatedChats })
        },
        error: error => {
          console.warn(error)
        },
      })
    })

    this.deleteChatListener = this.getUser().then(user => {
      API.graphql(
        graphqlOperation(onDeleteChat, { owner: user.username })
      ).subscribe({
        next: chatData => {
          const deletedChat = chatData.value.data.onDeleteChat
          const updatedChats = this.state.chats.filter(
            chat => chat.id !== deletedChat.id
          )
          this.setState({ chats: updatedChats })
        },
      })
    })

    this.updateChatListener = this.getUser().then(user => {
      API.graphql(
        graphqlOperation(onUpdateChat, { owner: user.username })
      ).subscribe({
        next: chatData => {
          const { chats } = this.state
          const updatedChat = chatData.value.data.onUpdateChat
          const index = chats.findIndex(chat => chat.id === updatedChat.id)
          const updatedChats = [
            ...chats.slice(0, index),
            updatedChat,
            ...chats.slice(index + 1),
          ]
          this.setState({ chats: updatedChats, chat: '', id: '' })
        },
      })
    })
  }

  getChats = async () => {
    const result = await API.graphql(graphqlOperation(listChats))
    this.setState({ chats: result.data.listChats.items })
  }

  handleChangeChat = event => this.setState({ chat: event.target.value })

  hasExistingChat = () => {
    const { chats, id } = this.state
    if (id) {
      const isChat = chats.findIndex(chat => chat.id === id) > -1
      return isChat
    }
    return false
  }

  handleUpdateChat = async () => {
    const { id, chat } = this.state
    const input = {
      id,
      chat,
    }
    await API.graphql(graphqlOperation(updateChat, { input }))
  }

  handleAddChat = async event => {
    const { chat } = this.state
    event.preventDefault()
    if (this.hasExistingChat()) {
      this.handleUpdateChat()
    } else {
      // check if we have an existing chat, if so, update it
      const input = { chat }
      await API.graphql(graphqlOperation(createChat, { input }))
      // const newChat = result.data.createChat;
      // const updatedChats = [newChat, ...chats];
      this.setState({ chat: '' })
    }
  }

  handleDeleteChat = async chatId => {
    const input = { id: chatId }
    await API.graphql(graphqlOperation(deleteChat, { input }))
    // const deletedChatId = result.data.deleteChat.id;
    // const updatedChats = chats.filter((chat) => chat.id !== deletedChatId);
    // this.setState({ chats: updatedChats });
  }

  handleSetChat = ({ chat, id }) => this.setState({ chat, id })

  render() {
    const author = user.name
    const { chats, chat, id } = this.state
    return (
      <div>
        <div>
          <h1>Chats</h1>
          <p>ID: {author}</p>
          <form onSubmit={this.handleAddChat}>
            <input
              type="text"
              placeholder="Write your chat!"
              onChange={this.handleChangeChat}
              value={chat}
            />
            <button type="submit">{id ? 'Update Chat' : 'Add Chat'}</button>
          </form>
          <div>
            {chats.map(item => (
              <div key={item.id} className="flex items-center">
                <li onClick={() => this.handleSetChat(item)} className="">
                  {item.chat}
                </li>
                <button onClick={() => this.handleDeleteChat(item.id)}>
                  <span>&times;</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <Link to="/app/home">Home</Link>
      </div>
    )
  }
}

export default Chat

export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(this._handleResponse)
      }

    addNewCard(userData) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          link: userData.link
        })
      })
      .then(this._handleResponse)
    }

    getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
     })
      .then(this._handleResponse)
    }

    setProfileInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      })
      .then(this._handleResponse)
    }

    // addLike(id) {
    //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    //     method: 'PUT',
    //     headers: this._headers,
    //   })
    //   .then(this._handleResponse)
    // }

    // removeLike(id) {
    //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    //     method: "DELETE",
    //     headers: this._headers,
    //   })
    //   .then(this._handleResponse)
    // }

    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(this._handleResponse)
    }

    addNewAvatar(userData) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.avatar
        })
      })
      .then(this._handleResponse)
    }
    }

  export const api = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
      headers: {
        authorization: '9b46d791-fb3a-4f6c-afe0-1b838c18e4bc',
        'Content-Type': 'application/json'
      }
    });


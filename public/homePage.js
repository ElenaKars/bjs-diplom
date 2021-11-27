"use strict";

const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout( (res) => {
    if ( res.success ) {
      location.reload();
    }
  })
}
ApiConnector.current((res) => {
  if ( res.success ) {
    ProfileWidget.showProfile(res.data)
  }
})
const ratesBoard = new RatesBoard();

const getStocks = () => {
  ApiConnector.getStocks( ( res ) => {
    if ( res.success ) {
      ratesBoard.clearTable()
      ratesBoard.fillTable(res.data)
    }
  })
}

getStocks()

setInterval(getStocks, 60000);

const moneyManager = new MoneyManager()

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney( data, ( res ) => {
    if ( res.success ) {
      ProfileWidget.showProfile( res.data )
    }

    moneyManager.setMessage(res.success, res.error || 'Успешно!')
  })
}

moneyManager.conversionMoneyCallback = ( data ) => {
    ApiConnector.convertMoney( data, (res) => {
      if ( res.success ) {
        ProfileWidget.showProfile( res.data )
      }
  
      moneyManager.setMessage(res.success, res.error || 'Успешно!')
    })
  }

  moneyManager.sendMoneyCallback = ( data ) => {
    ApiConnector.transferMoney( data, ( res ) => {
      if ( res.success ) {
        ProfileWidget.showProfile( res.data )
      }
  
      moneyManager.setMessage(res.success, res.error || 'Успешно!')
    })
  }
  
  const favoritesWidget = new FavoritesWidget()

    ApiConnector.getFavorites( ( res ) => {
      if ( res.success ) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable( res.data )
        moneyManager.updateUsersList(res.data)
      }
    })

    favoritesWidget.addUserCallback = (data) => {
        ApiConnector.addUserToFavorites( data, ( res ) => {
          if ( res.success ) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable( res.data )
            moneyManager.updateUsersList(res.data)
          }
      
          moneyManager.setMessage(res.success, res.error || 'Успешно!')
        })
      }

      favoritesWidget.removeUserCallback = ( data ) => {
        ApiConnector.removeUserFromFavorites( data, ( res ) => {
          if ( res.success ) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable( res.data )
            moneyManager.updateUsersList(res.data)
          }
      
          moneyManager.setMessage(res.success, res.error || 'Успешно!')
        })
      }


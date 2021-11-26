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
      console.log(res);
      ratesBoard.clearTable()
      ratesBoard.fillTable(res.data)
    }
  })
}

getStocks()

setInterval(() => {
  getStocks()
}, 60000);

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Application extends React.Component {

  constructor(props) {
    super(props);

    //Initializing State
    this.state = {
      route: "contact",
      fromAccount: 0,
      toAccount: 0,
      transferType: "",
      ammount: 0,
      memo: {
        text: "",
        len: 0 },

      fromAccounts: [
      { "id": "154", "amount": 1212.0, "name": "Jimmy's Account" },
      { "id": "164", "amount": 1412.0, "name": "Account 1" },
      { "id": "174", "amount": 1612.0, "name": "Account 2" },
      { "id": "184", "amount": 1812.0, "name": "Account 3" },
      { "id": "194", "amount": 1912.0, "name": "Account 4" },
      { "id": "204", "amount": 2012.0, "name": "Account 5" }],

      toAccounts: [
      { "id": "164", "amount": 1412.0, "name": "Account 1" },
      { "id": "174", "amount": 1612.0, "name": "Account 2" },
      { "id": "184", "amount": 1812.0, "name": "Account 3" },
      { "id": "194", "amount": 1912.0, "name": "Account 4" },
      { "id": "204", "amount": 2012.0, "name": "Account 5" }],

      startDate: this.getToday(),
      endDate: null,
      frequency: null,
      modal: false,
      form: [],
      errors: [] };

  }

  //Helper Functions
  changeFrom(event) {
    const fromAccount = event.target.value;
    let toAccounts = [...this.state.fromAccounts];
    toAccounts = _.without(toAccounts, _.find(toAccounts, ["id", fromAccount]));
    const toAccount = fromAccount === this.state.toAccount ? 0 : this.state.toAccount;
    this.setState({ fromAccount, toAccounts, toAccount });
  }
  changeTo(event) {this.setState({ toAccount: event.target.value });}
  changeAmmount(event) {this.setState({ ammount: event.target.value });}
  changeMemo(event) {this.setState({ memo: { text: event.target.value, len: event.target.value.length } });}
  changeTransfer(event) {this.setState({ transferType: event.target.value, endDate: null, frequency: null });}
  changeFrequency(event) {this.setState({ frequency: event.target.value });}
  changeStartDate(event) {this.setState({ startDate: event.target.value });}
  changeEndDate(event) {this.setState({ endDate: event.target.value });}
  showModal(modal) {this.setState({ modal });}
  confirmSubmit() {this.setState({ modal: false, route: "confirm" });}
  restart() {this.setState({
      route: "form",
      fromAccount: 0,
      toAccount: 0,
      transferType: "",
      ammount: 0,
      memo: {
        text: "",
        len: 0 },

      startDate: this.getToday(),
      endDate: null,
      frequency: null,
      modal: false,
      form: [],
      errors: [] });
  }
  setRoute(route) {this.setState({ route });}

  validate() {
    let errors = {};
    let valid = true;
    if (!this.state.fromAccount) errors.fromAccount = "From Account Field is Required";
    if (!this.state.toAccount) errors.toAccount = "To Account Field is Required";
    if (!this.state.startDate) errors.startDate = "From Account Field is Required";
    if (!this.state.ammount) errors.ammount = "Ammount Field is Required";
    if (!this.state.transferType) {
      errors.transferType = "Transfer Type Field is Required";
    } else if (this.state.transferType === "Automatic Transfer") {
      if (!this.state.endDate) errors.endDate = "End Date Field is Required";
      if (!this.state.frequency) errors.frequency = "Frequency Field is Required";
    }

    if (Object.getOwnPropertyNames(errors).length > 0) valid = false;
    this.setState({ errors });
    console.log(errors);
    return valid;
  }

  getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = yyyy + '-' + mm + '-' + dd;

    return today;
  }

  //Handle Form Submitting
  handleSubmit(event) {
    event.preventDefault();
    if (!this.validate()) return;
    this.setState({
      modal: true,
      form: [
      { "From Account": this.state.fromAccount },
      { "To Account": this.state.toAccount },
      { "Transfer Type": this.state.transferType },
      { "Date": this.state.startDate },
      { "End Date": this.state.endDate },
      { "Frequency": this.state.frequency },
      { "Ammount": "$" + this.state.ammount },
      { "Memo": this.state.memo.text }] });


  }

  //Helper Render Function
  showHiddenFields(radio) {
    if (radio === "One Time Transfer") {
      return /*#__PURE__*/(
        React.createElement("fieldset", { className: this.state.errors.startDate ? "error" : "" }, /*#__PURE__*/
        React.createElement("label", { className: "main-label" }, "Transfer Date"), /*#__PURE__*/
        React.createElement("input", { type: "date", value: this.state.startDate, onChange: this.changeStartDate.bind(this) }), /*#__PURE__*/
        React.createElement("i", { className: "fa fa-calendar fa-fw" })));


    } else if (radio === "Automatic Transfer") {
      return /*#__PURE__*/(
        React.createElement(HiddenFields, { startDate: this.state.startDate, endDate: this.state.endDate, frequency: this.state.frequency,
          changeStartDate: this.changeStartDate.bind(this),
          changeEndDate: this.changeEndDate.bind(this),
          changeFrequency: this.changeFrequency.bind(this), errors: this.state.errors }));

    }
  }

  renderModal() {
    if (!this.state.modal) return;
    console.log("Showing Modal");
    return /*#__PURE__*/(
      React.createElement("div", { className: "modalWindow" }, /*#__PURE__*/
      React.createElement("div", { className: "modal-content" }, /*#__PURE__*/
      React.createElement("a", { href: "#", className: "close-button", onClick: () => {this.showModal(false);} }), /*#__PURE__*/
      React.createElement(Verify, { form: this.state.form, showModal: this.showModal.bind(this), confirmSubmit: this.confirmSubmit.bind(this) }))));



  }

  router(route) {
    if (route === "form") {
      return /*#__PURE__*/(
        React.createElement("div", null, /*#__PURE__*/
        React.createElement("h3", null, "Transfer Funds"), /*#__PURE__*/
        React.createElement("form", { onSubmit: this.handleSubmit.bind(this) }, /*#__PURE__*/
        React.createElement(Select, { onChange: this.changeFrom.bind(this), account: this.state.fromAccount, title: "From account",
          css_class: this.state.errors.fromAccount ? "half-width error" : "half-width", serverResponse: this.state.fromAccounts }), /*#__PURE__*/
        React.createElement(Select, { onChange: this.changeTo.bind(this), account: this.state.toAccount, title: "To account",
          css_class: this.state.errors.toAccount ? "half-width right error" : "half-width right", serverResponse: this.state.toAccounts }), /*#__PURE__*/
        React.createElement("fieldset", { className: this.state.errors.transferType ? "half-width error" : "half-width" }, /*#__PURE__*/
        React.createElement("label", { className: "main-label" }, "Transfer Type"), /*#__PURE__*/
        React.createElement("input", { type: "radio", name: "rad_transferType", id: "radTransferType_ott", value: "One Time Transfer",
          onClick: this.changeTransfer.bind(this) }), /*#__PURE__*/
        React.createElement("label", { htmlFor: "radTransferType_ott" }, "One-Time Transfer"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
        React.createElement("input", { type: "radio", name: "rad_transferType", id: "radTransferType_at", value: "Automatic Transfer",
          onClick: this.changeTransfer.bind(this) }), /*#__PURE__*/
        React.createElement("label", { htmlFor: "radTransferType_at" }, "Automatic Transfer")), /*#__PURE__*/

        React.createElement("fieldset", { className: this.state.errors.ammount ? "half-width right error" : "half-width right" }, /*#__PURE__*/
        React.createElement("label", { className: "main-label" }, "Amount"), /*#__PURE__*/
        React.createElement("i", { className: "fa fa-dollar fa-fw" }), /*#__PURE__*/
        React.createElement("input", { type: "number", value: this.state.ammount, onChange: this.changeAmmount.bind(this) })),

        this.showHiddenFields(this.state.transferType), /*#__PURE__*/
        React.createElement(Memo, { onChange: this.changeMemo.bind(this), memo: this.state.memo, maxlen: 120 }), /*#__PURE__*/
        React.createElement("fieldset", { className: "button-holder" }, /*#__PURE__*/
        React.createElement("input", { type: "button", className: "button simpleButton", value: "Cancel" }), /*#__PURE__*/
        React.createElement("input", { type: "submit", className: "button CTAButton", value: "Next" })))));




    } else if (route === "confirm") {
      return /*#__PURE__*/React.createElement(Confirm, { form: this.state.form, setRoute: this.restart.bind(this) });
    } else if (route === "profile") {
      return /*#__PURE__*/React.createElement(Profile, null);
    } else if (route === "home") {
      return /*#__PURE__*/React.createElement(Home, null);
    } else if (route === "contact") {
      return /*#__PURE__*/React.createElement(Contact, null);
    }
  }

  render() {
    console.log(this.state);
    return /*#__PURE__*/(
      React.createElement("div", { className: "divMain" }, /*#__PURE__*/
      React.createElement(Header, { setRoute: this.setRoute.bind(this) }), /*#__PURE__*/
      React.createElement("section", { className: "mainSection" },
      this.router(this.state.route)), /*#__PURE__*/

      React.createElement("input", { type: "checkbox", name: "chkOpenMenu", id: "chkOpenMenu", className: "hide" }), /*#__PURE__*/
      React.createElement("label", { htmlFor: "chkOpenMenu", className: "lblOpenMenu smallDisplay" }, /*#__PURE__*/
      React.createElement("span", { className: "openItem" }), /*#__PURE__*/
      React.createElement("span", { className: "closeItem" })), /*#__PURE__*/

      React.createElement(Footer, null), /*#__PURE__*/
      React.createElement("input", { type: "checkbox", name: "chkShowFooter", id: "chkShowFooter", defaultChecked: "true", className: "hide" }),
      this.renderModal()));


  }}


const Header = props => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "btnMenu" }, /*#__PURE__*/
    React.createElement("label", { htmlFor: "chkMenu" }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-bars" }))), /*#__PURE__*/


    React.createElement("input", { type: "checkbox", id: "chkMenu" }), /*#__PURE__*/
    React.createElement("nav", { className: "menu" }, /*#__PURE__*/
    React.createElement("div", { className: "title" }, "National Bank"), /*#__PURE__*/
    React.createElement("ul", null, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("label", { htmlFor: "chkMenu", onClick: () => props.setRoute("profile") }, "Transfer Activity")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("label", { htmlFor: "chkMenu", onClick: () => props.setRoute("form") }, "Transactions")), /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/React.createElement("label", { htmlFor: "chkMenu", onClick: () => props.setRoute("contact") }, "Contact"))))));




};

const Memo = props => {
  return /*#__PURE__*/(
    React.createElement("fieldset", null, /*#__PURE__*/
    React.createElement("label", { className: "main-label" }, "Memo (OPTIONAL: Maximum of ", props.maxlen, " characters)"), /*#__PURE__*/
    React.createElement("textarea", { maxLength: props.maxlen, id: "memoText", onChange: props.onChange, value: props.memo.text }), /*#__PURE__*/
    React.createElement("span", null, props.maxlen - props.memo.len, " characters remaining.")));


};

class Select extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //Load Data here!
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("fieldset", { className: this.props.css_class }, /*#__PURE__*/
      React.createElement("label", null, this.props.title), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-user fa-fw" }), /*#__PURE__*/
      React.createElement("select", { onChange: this.props.onChange, value: this.props.account },
      this.props.serverResponse.map(option => {
        return /*#__PURE__*/(
          React.createElement("option", { key: option.id, value: option.id },
          option.name));


      }))));



  }}


const HiddenFields = props => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("fieldset", { className: props.errors.startDate ? "half-width error" : "half-width" }, /*#__PURE__*/
    React.createElement("label", { className: "main-label" }, "Start Date"), /*#__PURE__*/
    React.createElement("input", { type: "date", value: props.startDate, onChange: props.changeStartDate }), /*#__PURE__*/
    React.createElement("i", { className: "fa fa-calendar fa-fw" })), /*#__PURE__*/

    React.createElement("fieldset", { className: props.errors.endDate ? "half-width right error" : "half-width right" }, /*#__PURE__*/
    React.createElement("label", { className: "main-label" }, "End Date"), /*#__PURE__*/
    React.createElement("input", { type: "date", value: props.endDate, onChange: props.changeEndDate }), /*#__PURE__*/
    React.createElement("i", { className: "fa fa-calendar fa-fw" })), /*#__PURE__*/

    React.createElement("fieldset", { className: props.errors.frequency ? "error" : "" }, /*#__PURE__*/
    React.createElement("label", { className: "main-label" }, "Frequency"), /*#__PURE__*/
    React.createElement("select", { value: props.frequency, onChange: props.changeFrequency }, /*#__PURE__*/
    React.createElement("option", { value: "Weekly" }, "Weekly"), /*#__PURE__*/
    React.createElement("option", { value: "Bi-Monthly" }, "1st and 15th of each month"), /*#__PURE__*/
    React.createElement("option", { value: "Monthly" }, "Every Month"), /*#__PURE__*/
    React.createElement("option", { value: "Every Two Months" }, "Every Two Months")), /*#__PURE__*/

    React.createElement("i", { className: "fa fa-refresh fa-fw" }))));



};

const Verify = props => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", null, "Please verify your data"), /*#__PURE__*/
    React.createElement("div", { className: "modal-body" }, /*#__PURE__*/
    React.createElement(Summary, { form: props.form }), /*#__PURE__*/
    React.createElement("fieldset", { className: "button-holder" }, /*#__PURE__*/
    React.createElement("input", { type: "button", className: "button simpleButton", value: "Previous", onClick: () => props.showModal(false) }), /*#__PURE__*/
    React.createElement("input", { type: "submit", className: "button CTAButton", value: "Submit", onClick: () => props.confirmSubmit() })))));




};

const Confirm = props => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  today = mm + '/' + dd + '/' + yyyy;
  return /*#__PURE__*/(
    React.createElement("div", { className: "confirm" }, /*#__PURE__*/
    React.createElement("div", { className: "notice success" }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-smile-o" }), /*#__PURE__*/
    React.createElement("p", null, "Your transfer has been successfully completed on ", today, " with confirmation number ", Math.random() * 10000000000000000)), /*#__PURE__*/

    React.createElement("h3", null, "Summary"), /*#__PURE__*/
    React.createElement(Summary, { form: props.form }), /*#__PURE__*/
    React.createElement("div", { className: "button-holder" }, /*#__PURE__*/
    React.createElement("input", { type: "button", className: "button CTAButton", value: "Do Another Transaction", onClick: () => props.setRoute("form") }))));



};

const Summary = props => {
  return /*#__PURE__*/(
    React.createElement("dl", null,
    props.form.map(
    field => {
      var key = Object.getOwnPropertyNames(field);
      if (!field[key[0]]) return null;
      return /*#__PURE__*/(
        React.createElement("div", { key: key[0] + field[key[0]] }, /*#__PURE__*/
        React.createElement("dt", null, key[0]), /*#__PURE__*/
        React.createElement("dd", null, field[key[0]])));


    })));



};

const pendingData = [
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
{ Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" }];


const processedData = [
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
{ Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" }];


const Profile = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "transfer-activity profile" }, /*#__PURE__*/
    React.createElement("h3", null, "Transfer Activity"), /*#__PURE__*/
    React.createElement("h4", null, "Pending Transfers"), /*#__PURE__*/
    React.createElement(SimpleTable, { data: processedData }), /*#__PURE__*/
    React.createElement("h4", null, "Processed Transfers"), /*#__PURE__*/
    React.createElement(SimpleTable, { data: pendingData })));


};

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: [] };

  }

  componentWillMount() {
    this.setState({ header: Object.getOwnPropertyNames(this.props.data[0]) });
  }

  renderHeader(columns) {
    return /*#__PURE__*/(
      React.createElement("thead", null, /*#__PURE__*/
      React.createElement("tr", null,
      columns.map((column, index) => {
        return /*#__PURE__*/(
          React.createElement("td", { key: index }, column));

      }))));



  }

  renderBody(rows, columns) {
    return /*#__PURE__*/(
      React.createElement("tbody", null,
      rows.map((row, index) => {
        return /*#__PURE__*/(
          React.createElement("tr", { key: index },
          columns.map((column, innerIndex) => {
            return /*#__PURE__*/(
              React.createElement("td", { key: innerIndex }, row[column]));

          })));


      })));


  }

  render() {
    if (this.state.header.length === 0) return false;
    return /*#__PURE__*/(
      React.createElement("div", { className: "transfer-activity-table" }, /*#__PURE__*/
      React.createElement("table", { className: "" },
      this.renderHeader(this.state.header),
      this.renderBody(this.props.data, this.state.header))));



  }}


class GMap extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { zoom: 10 });}

  static propTypes() {
    initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", { className: "GMap" }, /*#__PURE__*/
    React.createElement("div", { className: "GMap-canvas", ref: "mapCanvas" }));


  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    this.marker = this.createMarker();
    this.infoWindow = this.createInfoWindow();

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange());
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed');
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter() };

    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  mapCenter() {
    return new google.maps.LatLng(
    this.props.initialCenter.lat,
    this.props.initialCenter.lng);

  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map });

  }

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>National Bank</div>";
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString });

  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom() });

  }}


var initialCenter = { lng: -103.4054536, lat: 20.6737777 };
const Contact = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "profile" }, /*#__PURE__*/
    React.createElement("h3", null, "Contact Page"), /*#__PURE__*/
    React.createElement(GMap, { initialCenter: initialCenter }), /*#__PURE__*/
    React.createElement("ul", { className: "profile-content" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/
    React.createElement("h4", null, "Phone Number"), /*#__PURE__*/
    React.createElement("p", null, "555-555555")), /*#__PURE__*/

    React.createElement("li", null, /*#__PURE__*/
    React.createElement("h4", null, "Email"), /*#__PURE__*/
    React.createElement("p", null, "national@bank.com")), /*#__PURE__*/

    React.createElement("li", null, /*#__PURE__*/
    React.createElement("h4", null, "Location"), /*#__PURE__*/
    React.createElement("p", null, "27 Maple Drive, Washington DC")))));




};

const Footer = props => {
  return /*#__PURE__*/(
    React.createElement("footer", null, /*#__PURE__*/
    React.createElement("div", { className: "firstLevelFooter" }), /*#__PURE__*/
    React.createElement("div", { className: "secondLevelFooter" })));


};



ReactDOM.render( /*#__PURE__*/React.createElement(Application, null), document.getElementById('container'));
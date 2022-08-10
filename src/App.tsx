import Content from "./Page"
import { Provider } from "react-redux";
import store from "./store";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./App.less";

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Content/>
            </div>
        </Provider>
    );
}

export default App;

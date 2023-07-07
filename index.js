// dùng thư viện redux
// import redux, { createStore } from "https://cdn.skypack.dev/redux";

// Tự code lại thư viện redux
// My Redux

function createStore(reducer) {
    let state = reducer(undefined, {});

    const subscribers = [];

    // console.log(state)
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            // console.log(action)
            state = reducer(state, action);
            subscribers.forEach((subscriber) => subscriber());
        },
        subscribe(subscriber) {
            subscribers.push(subscriber);
        },
    };
}

// My App

// khởi tạp giá trị đầu vào
const initState = 0;

// Reducer
// Khởi tạo reducer
function bankReducer(state = initState, action) {
    switch (action.type) {
        case "DEPOSIT":
            return state + action.payload;
        case "INCREMENT":
            return state - action.payload;
        default:
            return state;
    }
}

//store
// tạo store
const store = (window.store = createStore(bankReducer));

// console.log(store.getState());
//kết quả là: 0
/**
 * vì khi chạy lần đầu nó sẽ chưa có chạy vào các case "Deposit" và "Increment" mà nó chạy vào default và state = 0 vì mình gán giá trị ban đầu là initState
 *
 * cho nên là log ra ban đầu sẽ là 0
 */

/**
 * Trong store có các method:
 * dispatch: giúp chúng ta bắn đi dữ liệu của 1 action "hành đông"",
 *
 * getState: trả lại cho chúng ta cái state hiện tại.
 *
 * replcaeReducer
 *
 * subscribe: thông báo lại dưới callback. Tức là sau khi state của bạn cập nhật, sau khi nó đẩy action và state cũ đi vào reducer và trả ra cái state mới thì subscribe sẽ gọi lại báo cho các bạn biết từ đó bạn có thể sử dụng nó để xử lý và cập nhật lại giao diện
 */

// Actions

function actionDeposit(payload) {
    return {
        type: "DEPOSIT",
        payload, // viết tối giản của payload: payload
    };
}
function actionIncrement(payload) {
    return {
        type: "INCREMENT",
        payload, // viết tối giản của payload: payload
    };
}

// DOM event lắng nghe sự kiện

const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");

// Event handler

deposit.onclick = function () {
    // actionDeposit là đang gọi function (đối số truyền vào là số tiền bạn muốn nạp, ví dụ tui nạp 10$)
    store.dispatch(actionDeposit(10));
};

withdraw.onclick = function () {
    store.dispatch(actionIncrement(10));
};

// Listener
store.subscribe(() => {
    console.log("State vừa update xong");
    render();
});

// Tạo hàm render lại giao diện
function render() {
    const output = document.querySelector("#output");
    output.innerText = store.getState();
}

render();

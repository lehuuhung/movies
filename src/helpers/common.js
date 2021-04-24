// kiểm tra xem object có rỗng(key) ko
export const isEmptyObject = (obj) => {
    // dùng for là cho array
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }
    return true;
}
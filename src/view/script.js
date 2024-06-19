// 모달 열기 함수
function guide() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// 모달 닫기 함수
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


async function fetchData() {
    try {
    const userResponse = await fetch('http://localhost:5000/admin/count');
    const userData = await userResponse.json();
    document.getElementById('user-count').textContent = `유저 ${userData.count}명`;

    const bookResponse = await fetch('http://localhost:5000/books/count');
    const bookData = await bookResponse.json();
    document.getElementById('book-count').textContent = `책 ${bookData.count}권`;

    const coupangResponse = await fetch('http://localhost:5000/coupang_products/food_count');
    const coupangData = await coupangResponse.json();
    document.getElementById('coupang-count').textContent = `쿠팡 음식 ${coupangData.count}개`;

} catch (error) {
    console.error('데이터 가져오기 실패:', error);
}
}

    async function fetchSpecificData() {
    const input = document.getElementById('input-id').value;
    try {
    const response = await fetch(`http://localhost:5000/books/info/${input}`);
    const data = await response.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
} catch (error) {
    console.error('데이터 가져오기 실패:', error);
}
}

    window.onload = fetchData;




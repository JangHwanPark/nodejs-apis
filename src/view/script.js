// 모달 열기 함수
function guide() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// 모달 닫기 함수
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

async function fetchData() {
    try {
        const userResponse = await fetch('http://34.197.44.20/admin/count');
        const userData = await userResponse.json();
        document.getElementById('user-count').textContent = `전체 유저 ${userData.count}명 조회`;

        const bookResponse = await fetch('http://34.197.44.20/books/count');
        const bookData = await bookResponse.json();
        document.getElementById('book-count').textContent = `전체 책 ${bookData.count}권 조회`;

        const coupangResponse = await fetch('http://34.197.44.20/coupang_products/count');
        const coupangData = await coupangResponse.json();
        document.getElementById('coupang-count').textContent = `전체 쿠팡 제품 ${coupangData.count}개 조회`;

    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
}

async function fetchSpecificDatausers() {
    const input = document.getElementById('input-id-users').value;
    try {
        const response = await fetch(`http://34.197.44.20/admin/user/${input}`);
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
}

async function fetchSpecificDatabooks() {
    const input = document.getElementById('input-id-books').value;
    try {
        const response = await fetch(`http://localhost:5000/books/info/${input}`);
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
}

async function fetchSpecificDataproducts() {
    const input = document.getElementById('input-id-products').value;
    try {
        const response = await fetch(`http://34.197.44.20/coupang_products/product/${input}`);
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
}

function showInput(section) {
    // 모든 입력 섹션을 숨김
    const inputSections = document.querySelectorAll('.input-section');
    inputSections.forEach(section => {
        section.style.display = 'none';
    });

    // 선택한 섹션만 보이도록 함
    const selectedInput = document.querySelector(`.input-section.${section}`);
    if (selectedInput) {
        selectedInput.style.display = 'flex'; // 또는 'block' 등으로 설정
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 기본적으로 특정 유저 조회 입력 창만 보이도록 설정
    const inputSections = document.querySelectorAll('.input-section');
    inputSections.forEach(section => {
        if (section.classList.contains('users')) {
            section.style.display = 'flex'; // 또는 'block' 등으로 설정
        } else {
            section.style.display = 'none';
        }
    });
});

window.onload = fetchData;
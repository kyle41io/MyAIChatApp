document.addEventListener('deviceready', function() {
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  // Hàm thêm tin nhắn vào khung chat
  function appendMessage(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.className = sender;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Hàm gọi API DeepSeek
  function getDeepSeekResponse(userText, callback) {
      const apiUrl = 'https://api.deepseek.com/v1/chat'; // Thay bằng API endpoint thực tế
      const apiKey = 'YOUR_DEEPSEEK_API_KEY'; // Thay bằng API key của bạn

      cordova.plugin.http.post(
          apiUrl,
          { message: userText },
          { 'Authorization': 'Bearer ' + apiKey },
          function(response) {
              const data = JSON.parse(response.data);
              callback(data.response);
          },
          function(error) {
              console.error('Lỗi khi gọi API:', error);
              callback(null, error);
          }
      );
  }

  // Xử lý sự kiện khi nhấn nút Gửi
  sendBtn.addEventListener('click', function() {
      const userText = chatInput.value;
      if (userText) {
          appendMessage('user', userText); // Hiển thị tin nhắn của người dùng
          chatInput.value = ''; // Xóa nội dung trong ô nhập

          // Gọi API DeepSeek
          getDeepSeekResponse(userText, function(response, error) {
              if (response) {
                  appendMessage('deepseek', response); // Hiển thị phản hồi từ DeepSeek
              } else {
                  appendMessage('deepseek', 'Xin lỗi, có lỗi xảy ra khi kết nối với DeepSeek.');
              }
          });
      }
  });
}, false);
function getCredentials() {
  const idInstance = document.getElementById("idInstance").value.trim();
  const apiTokenInstance = document.getElementById("apiTokenInstance").value.trim();

  if (!idInstance || !apiTokenInstance) {
    throw new Error("Введите idInstance и ApiTokenInstance");
  }

  return { idInstance, apiTokenInstance };
}

function setResponse(data) {
  const responseField = document.getElementById("response");
  responseField.value = typeof data === "string"
    ? data
    : JSON.stringify(data, null, 2);
}

async function requestGreenApi(method, body = null) {
  try {
    const { idInstance, apiTokenInstance } = getCredentials();

    // имитация задержки (как будто реальный API)
    await new Promise(resolve => setTimeout(resolve, 500));

    let fakeResponse = {};

    if (method === "getSettings") {
      fakeResponse = {
        wid: "77771234567@c.us",
        countryInstance: "kz",
        typeAccount: "personal"
      };
    }

    if (method === "getStateInstance") {
      fakeResponse = {
        stateInstance: "authorized"
      };
    }

    if (method === "sendMessage") {
      fakeResponse = {
        idMessage: "ABC123XYZ",
        status: "sent",
        chatId: body.chatId,
        message: body.message
      };
    }

    if (method === "sendFileByUrl") {
      fakeResponse = {
        idMessage: "FILE456XYZ",
        status: "sent",
        chatId: body.chatId,
        file: body.urlFile
      };
    }

    setResponse(fakeResponse);

  } catch (error) {
    setResponse("Ошибка: " + error.message);
  }
}




async function getSettings() {
  await requestGreenApi("getSettings");
}

async function getStateInstance() {
  await requestGreenApi("getStateInstance");
}

async function sendMessage() {
  const phone = document.getElementById("phoneMessage").value.trim();
  const message = document.getElementById("messageText").value.trim();

  if (!phone || !message) {
    setResponse("Ошибка: введите номер и сообщение");
    return;
  }

  await requestGreenApi("sendMessage", {
    chatId: `${phone}@c.us`,
    message: message
  });
}

async function sendFileByUrl() {
  const phone = document.getElementById("phoneFile").value.trim();
  const fileUrl = document.getElementById("fileUrl").value.trim();

  if (!phone || !fileUrl) {
    setResponse("Ошибка: введите номер и ссылку на файл");
    return;
  }

  await requestGreenApi("sendFileByUrl", {
    chatId: `${phone}@c.us`,
    urlFile: fileUrl,
    fileName: "file"
  });
}
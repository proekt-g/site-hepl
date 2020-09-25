<?php
 
/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */
 
//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$number = $_POST['number'];
$name = $_POST['name'];
$device = $_POST['device'];
$model = $_POST['model'];
$character = $_POST['character'];
$type = $_POST['type'];
 
//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "825031954:AAEFGlsZUGF_1MU97Le05zvwS6Fb-hr7YSg";
 
//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "-349993394";
 
//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
  'Телефон: +' => $number,
  'Имя: ' => $name,
  'Устройство: ' => $device,
  'Модель: ' => $model,
  'Характер неисправности: ' => $character,
  'Тип услуги: ' => $type,

);
 
//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};
 
//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
 
//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
if ($sendToTelegram) {
  echo 1;
} else {
  echo 0;
}
?>
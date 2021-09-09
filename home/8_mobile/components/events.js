import {EventEmitter} from 'events';

let mobileCompanyEvents=new EventEmitter(); 
// в потоке mobileCompanyEvents будут все события, связанные с изменением (отображением) списка клиентов
// событие "EClientToDelete" - нажата кнопка "удалить", его сэмиттирует MobileClient и примет MobileCompany
// событие "EClientToEdit" - нажата кнопка "редактировать", его сэмиттирует MobileClient и примет MobileCompany

export {mobileCompanyEvents};
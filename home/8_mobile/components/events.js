import {EventEmitter} from 'events';

let mobileCompanyEvents=new EventEmitter(); 
// в потоке mobileCompanyEvents будут все события, связанные с изменением (отображением) списка клиентов
// событие "EClientToDelete" - нажата кнопка "удалить", его сэмиттирует MobileClient и примет MobileCompany
// событие "EClientToEdit" - нажата кнопка "редактировать", его сэмиттирует MobileClient и примeт MobileCompany
// событие "EClientToAdd" - нажата кнопка "добавить", его сэмиттирует AddOrEditClient и примет MobileCompany
// событие "EClientToCancel" - нажата кнопка "отмена", его сэмиттирует AddOrEditClient и примет MobileCompany
// событие "EClientToSaveChanges" - нажата кнопка "сохранить изменения", его сэмиттирует AddOrEditClient и примет MobileCompany

export {mobileCompanyEvents};
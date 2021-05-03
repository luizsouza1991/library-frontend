import { environment } from '../../environments/environment';

export const Constant = {
  BASE_URL: environment.path,
  AUTHOR: 'author/',
  BOOK: 'book/'
}

export const MessageText = {
  SAVE: 'Record saved successfully',
  EDIT: 'Record updated successfully',
  DELETE: 'Record deleted successfully',
  ERROR: 'An unexpected error has occurred',
  ALERT: 'Do you want to continue with the action?',
  TITLE_SUCCESS: 'Success! ',
  TITLE_ALERT: 'Alert !',
  TITLE_ERROR: 'Error'
}


import api from 'utils/api';
import _ from 'lodash';

export const requestGetTickets = (id) =>
  api.callGet(
    !_.isNull(id) || !_.isEmpty(id)
      ? `admin/tickets/tickets-list?userid=${id}&sortby=date&order=desc`
      : `admin/tickets/tickets-list`
  );

export const requestSaveTicket = (params) =>
  api.callPostFormData(`admin/tickets/add`, params);

export const requestTicketCount = (id) =>
  api.callGet(`admin/tickets/ticket-status-count?userid=${id}`);

export const requestTicketOptions = () =>
  api.callGet(`admin/tickets/ticket-form-list`);

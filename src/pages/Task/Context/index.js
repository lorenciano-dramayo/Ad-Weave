import { createContext, useState } from 'react';

import _ from 'lodash';

// Redux
import { useDispatch } from 'react-redux';

// Reducer
import {
  updateTaskByKey,
  threadComment,
  updateTags,
  updateMobileDisplays,
  updateDesktopDisplays,
  updateDesktopDisplaysRemove,
  updateTriggers,
  deleteCommentAttachment,
  updateMobileDisplaysRemove,
  updateTimelogEnded,
  updateTimelogStart,
} from 'store/reducers/tasks';

import { formatDate } from 'utils/date';

import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [horizontal, setHorizontal] = useState('left');
  const [option, setOption] = useState([]);
  const [optionType, setOptionType] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [dialogData, setDialogData] = useState(null);
  const [comment, setComment] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isParent, setIsParent] = useState(null);
  const [isThreadEditing, setIsThreadEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTask, setIsTask] = useState(null);
  const [isSubtask, setIsSubtask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const { relType: relTypeFromParams } = useParams();
  const { taskId: taskIdFromParams } = useParams();

  // Toast notification
  const Toast = Swal.mixin({
    toast: true,
    icon: 'success',
    width: 370,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = (data) => {
    switch (data.key) {
      case 'tags':
        dispatch(updateTags(data));
        break;
      case 'mobile_displays':
        var itemData = [];
        if (data.action == 'add') {
          itemData.push({
            size: data.size,
            type: data.type == 'desktop_displays' ? 'desktop' : 'mobile',
            task_id: data.task_id,
            is_parent: 1,
            subtask: 0,
          });
          dispatch(updateMobileDisplays(itemData[0]));
        } else {
          itemData.push({
            ids: data.ids,
          });
          dispatch(updateMobileDisplaysRemove(itemData[0]));
        }

        break;
      case 'desktop_displays':
        var itemDataD = [];
        if (data.action == 'add') {
          itemDataD.push({
            size: data.size,
            type: data.type == 'desktop_displays' ? 'desktop' : 'mobile',
            task_id: data.task_id,
            is_parent: 1,
            subtask: 0,
          });
          dispatch(updateDesktopDisplays(itemDataD[0]));
        } else {
          itemDataD.push({
            ids: data.ids,
          });
          dispatch(updateDesktopDisplaysRemove(itemDataD[0]));
        }

        break;
      case 'triggers':
        dispatch(updateTriggers(data));
        break;

      case 'date_ended':
        var item_ended = [];
        item_ended.push({
          task_id: data?.id,
          timeline_id: isSubtask,
          time_out: formatDate(data?.value ?? '', 'YYYY-MM-DD hh:mm:ss'),
        });
        dispatch(updateTimelogEnded(item_ended[0]));
        break;

      case 'date_started':
        var item_started = [];
        item_started.push({
          task_id: data?.id,
          timeline_id: isSubtask,
          time_in: formatDate(data?.value ?? '', 'YYYY-MM-DD hh:mm:ss'),
        });
        dispatch(updateTimelogStart(item_started[0]));
        break;
      case 'assignees': {
        const isTask = data?.is_parent;

        if (isTask) {
          !_.find(selected, {
            id: data?.selectedArr?.id,
          })
            ? setSelected([...selected, data?.selectedArr])
            : setSelected(
                _.filter(selected, (s) => s.id != data?.selectedArr?.id)
              );
        } else {
          !_.find(selected, {
            user_id: `${data?.selectedArr?.id}`,
          })
            ? setSelected([...selected, data?.selectedArr])
            : setSelected(
                _.filter(selected, (s) => s.user_id != data?.selectedArr?.id)
              );
        }

        dispatch(updateTaskByKey(data));
        break;
      }

      case 'watcher':
        !_.find(selected, {
          user_id: data?.selectedArr?.id,
        })
          ? setSelected([
              ...selected,
              { ...data?.selectedArr, user_id: data?.selectedArr?.id },
            ])
          : setSelected(
              _.filter(selected, (s) => s.user_id != data?.selectedArr?.id)
            );

        dispatch(updateTaskByKey(data));
        break;
      default:
        dispatch(updateTaskByKey(data));
        break;
    }

    setSelectedTaskId(null);
  };

  const handleOpen = (
    event,
    position,
    type,
    data,
    select,
    relType,
    taskId,
    dialogData // For edit history dialog
  ) => {
    setIsParent(relType === 'task' ? 1 : 0);
    setIsSubtask(taskId);
    type === 'task' && setComment(select);
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelected(select);
    setHorizontal(position);
    setOptionType(type);
    setOption(data);
    setDialogData(dialogData);
    setSelectedTaskId(taskId);
  };

  const handleThreadOptions = (e, select) => {
    e.preventDefault();
    setSelectedThreadId(selected);
    setSelected(select);

    switch (select) {
      case 'comment_delete':
      case 'thread_delete':
        Swal.fire({
          title: '<p style="font-size: 0.85em">Do you want to continue?</p>',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          focusConfirm: false,
          customClass: {
            container: 'swal-container',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              threadComment(select, {
                id: selected,
                taskId: taskIdFromParams,
              })
            );
          }
        });
        break;
      case 'thread_edit':
      case 'comment_edit':
        setIsThreadEditing(true);
        break;
    }

    setIsEdit(select === 'edit_info' && true);
    setAnchorEl(null);
  };

  const handleThread = (relId, relType, comment, id, attachments) => {
    const form = new FormData();

    if (isThreadEditing) {
      const isEditingThread = selected !== 'comment_edit';

      form.append('id', isEditingThread ? id : id.commentId);
      form.append('rel_id', isEditingThread ? id : id.threadId);
      form.append('rel_type', relType);
      form.append('comment', comment);

      for (const attachment of attachments) {
        if (attachment.is_new ?? false)
          form.append('files_add[]', attachment.file);
      }

      dispatch(
        threadComment(
          isEditingThread ? 'edit_thread' : 'edit_thread_comment',
          form
        )
      );
      setIsThreadEditing(false);
    } else {
      form.append('rel_type', relType);
      form.append('comment', comment);

      if (!_.isEmpty(attachments)) {
        for (const attachment of attachments) {
          form.append('files[]', attachment.file);
        }
      }

      if (_.isNumber(id)) {
        // Adding a comment to a thread
        form.append('rel_id', relId);
        form.append('comment_id', id);
        dispatch(threadComment('add_thread_comment', form, isTask));
      } else {
        // Creating a thread
        form.append('rel_id', relId);
        dispatch(threadComment('add_thread', form, isTask));
      }
    }
  };

  const handleAttachments = (attachment) => {
    // const ids = attachments.map((a) => `${a.id}`);
    dispatch(deleteCommentAttachment({ ids: attachment.id }));
  };

  const handlePin = (id, type, isParent) => {
    // const isPinParent = type === 'task' ? 1 : 0;

    dispatch(
      updateTaskByKey({
        is_parent: isParent,
        id: id,
        key: 'pin',
        value: '',
      })
    );
  };

  const handleModal = (type, isOpen, data) => {
    switch (type) {
      case 'attachment_preview':
        setAttachmentPreview(data);
        break;
      case 'response_summary':
        setModalData(data);
        break;
      default:
        break;
    }

    setModalType(type);
    setIsModalOpen(isOpen);
  };

  return (
    <TaskContext.Provider
      value={{
        anchorEl,
        comment,
        horizontal,
        option,
        optionType,
        selected,
        selectedThreadId,
        attachmentPreview,
        modalType,
        modalData,
        dialogData,
        selectedTaskId,
        setIsTask,
        isEdit,
        isParent,
        isThreadEditing,
        isModalOpen,
        isSubtask,
        isTask,
        handleClose,
        handleSave,
        handleOpen,
        handleThreadOptions,
        handleThread,
        handlePin,
        handleModal,
        handleAttachments,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.any,
};

export default TaskContext;

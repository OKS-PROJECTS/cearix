/* eslint-disable react/only-export-components */
import { RowActions } from './chips'

/** Column config for a trailing view / edit / delete actions column. */
export const actionColumn = (opts = {}) => ({
  key: '__actions',
  header: <span className="sr-only">Actions</span>,
  align: 'end',
  render: (r) => (
    <RowActions
      onView={opts.onView && (() => opts.onView(r))}
      onEdit={opts.onEdit && (() => opts.onEdit(r))}
      onDelete={opts.onDelete && (() => opts.onDelete(r))}
    />
  ),
})

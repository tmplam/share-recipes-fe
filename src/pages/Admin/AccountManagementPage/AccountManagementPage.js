import classNames from 'classnames/bind';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import styles from './AccountManagementPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountManagementPage() {
  const COLUMNS = [
    {
      Header: 'STT',
      accessor: 'stt',
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row }) => (
        <Button className={cx('btn-delete')} >
          Xoá
        </Button>
      ),
    },
  ];
  
  const DATA_TABLE = [
    {
      stt: '1',
      username: 'roland123',
      role: 'user',
    },
    {
      stt: '2',
      username: 'cheng',
      role: 'admin',
    },
    {
      stt: '3',
      username: 'flixer',
      role: 'user',
    },
    {
      stt: '1',
      username: 'golden ramsey',
      role: 'admin',
    },
    {
      stt: '4',
      username: 'peter parker',
      role: 'user',
    },
    {
      stt: '5',
      username: 'superman123',
      role: 'user',
    },
  ];

  const tableInstance = useTable({
    columns: COLUMNS,
    data: DATA_TABLE,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Container className={cx('wrapper')}>
      <h1 className={cx('title')}>
        <FontAwesomeIcon icon={faListCheck} /> Danh Sách Các Tài Khoản
      </h1>
      <div className={cx('btn-create-div')}>
        <div>
          <Button className={cx('btn-create')}>Tạo tài khoản</Button>
        </div>
      </div>
      <table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

export default AccountManagementPage;

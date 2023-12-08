import React from "react";
import { Select } from 'antd';

const Search = () => {

  const optionsData =
    [
      {
        value: '1',
        label: 'USA',
      },
      {
        value: '2',
        label: 'UK',
      },
      {
        value: '3',
        label: 'India',
      },
      {
        value: '4',
        label: 'Africa',
      },
      {
        value: '5',
        label: 'XYZ',
      },
      {
        value: '6',
        label: 'ABC',
      },
    ]
  const optionsMonthData =
    [
      {
        value: '1',
        label: 'Jan',
      },
      {
        value: '2',
        label: 'Feb',
      },
      {
        value: '3',
        label: 'Mar',
      },
      {
        value: '4',
        label: 'Apr',
      },
      {
        value: '5',
        label: 'May',
      },
      {
        value: '6',
        label: 'Jun',
      },
      {
        value: '7',
        label: 'Jul',
      },
      {
        value: '8',
        label: 'Aug',
      },
      {
        value: '9',
        label: 'Sep',
      },
      {
        value: '10',
        label: 'Oct',
      },
      {
        value: '11',
        label: 'Nov',
      },
      {
        value: '12',
        label: 'Dec',
      },
    ]
  return (
    <>
      <div className='col-md-5'>
        <Select
          showSearch
          style={{
            width: 170,
          }}
          placeholder={"Select Month"}
          optionFilterProp={'children'}
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={optionsMonthData}
        // onChange={(value) => {
        //   handleOnChange(value, name);
        //   if (name === 'region') {
        //     setValue({ name: name, value: value })
        //   }
        // }}
        />

      </div>
      <div className='col-md-5'>
        <Select
          showSearch
          style={{
            width: 170,
          }}
          placeholder={"Select Country"}
          optionFilterProp={'children'}
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={optionsData}
        // onChange={(value) => {
        //   handleOnChange(value, name);
        //   if (name === 'region') {
        //     setValue({ name: name, value: value })
        //   }
        // }}
        />


      </div>

    </>
  );
}

export default Search;
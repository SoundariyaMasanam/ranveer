import React, { useEffect } from 'react'
import "assets/css/Dashboard/ContentLayout.css"
import { Select } from 'antd';
import { memberSearch } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux';
import { setForSearch } from 'redux/Reducers/MemberSlice';
import { setInitialState } from "redux/Reducers/MemberSlice";

const Search = ({
  className, options, style,
  name, placeholder, optionFilterProp,
  filterOption, filterSort, setValue,notFoundContent }) => {

  const { forSearch } = useSelector(state => state.member);
  const dispatch = useDispatch();
  const handleOnChange = (value, name) => {
    if(typeof value !== 'undefined' ){
      dispatch(setForSearch({ [name]: value }));  
    }else{
      dispatch(setForSearch({}));
    }
  }

  useEffect(() => {   
    if ( Object.keys(forSearch).length > 0) {
      dispatch(memberSearch(forSearch))
    }else{
      dispatch(setInitialState());
    }
  }, [forSearch]);

  return (
    <Select      
      allowClear
      showSearch
      value={forSearch[name]}
      style={style}
      placeholder={placeholder}
      optionFilterProp={optionFilterProp}
      filterOption={filterOption}
      filterSort={filterSort}
      options={options}
      className={className}
      onChange={(value) => {
        handleOnChange(value, name);
        if (name === 'region') {
          setValue({ name: name, value: value })
        }
      }}
      notFoundContent={notFoundContent}
    />
  )
}

export default Search
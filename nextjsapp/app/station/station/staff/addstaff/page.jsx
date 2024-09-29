"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import CallFor from '@/utilities/CallFor';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
		uid:'1',
        fullname: '',
        firstname: '',
        lastname: '',
        emailid: '',
        mobno: '',
        canlogin: false,
        password: '',
        usercode: '',
        image: null,
        profilestatus: '',
        isapproved: false,
        accountstatus: '',
        roleid: '',
        roleName: ''
    });
	const [roles, setRoles] = useState([]);
    const [rights, setRights] = useState({});
    const [allRights, setAllRights] = useState({});

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await CallFor('api/users',"get",null,"withoutAuth");


            setRoles(response.data.dropdowns.roles);

            const initialRights = {};
            const initialAllRights = {};
            response.data.model.rightsofUserModel.modules.forEach(module => {
                initialRights[module.moduleName] = {};
                initialAllRights[module.moduleName] = false;
                module.rightslist.forEach(right => {
                    initialRights[module.moduleName][right.rightid] = right.selected;
                });
            });
            setRights(initialRights);
            setAllRights(initialAllRights);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

	const handleAllRightsChange = (moduleName) => {
        setAllRights(prev => ({
            ...prev,
            [moduleName]: !prev[moduleName]
        }));

        setRights(prevRights => ({
            ...prevRights,
            [moduleName]: Object.keys(prevRights[moduleName]).reduce((acc, rightId) => {
                acc[rightId] = !allRights[moduleName];
                return acc;
            }, {})
        }));
    };


	const handleIndividualRightChange = (moduleName, rightId) => {
        setRights(prevRights => ({
            ...prevRights,
            [moduleName]: {
                ...prevRights[moduleName],
                [rightId]: !prevRights[moduleName][rightId]
            }
        }));
    };
	

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...formData,
               
                rightsofUserModel: {
                    modules: Object.entries(rights).map(([moduleName, moduleRights]) => ({
                        moduleName,
                        rightslist: Object.entries(moduleRights).map(([rightId, selected]) => ({
                            rightid: parseInt(rightId),
                            rightname: getRightName(rightId),
                            selected
                        }))
                    }))
                }
            };
            const response = await CallFor('api/users',"post",submitData,"withoutAuth");
            console.log('Employee added successfully:', response.data);
            // Reset form or redirect
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const getRightName = (rightId) => {
        const rightNames = ['Create', 'Read', 'Update', 'Delete'];
        return rightNames[(rightId - 1) % 4];
    };

    return (
        <div className="container mx-auto">
            <div className='text-xl font-semibold text-orange-400 mb-4'>
                ADD EMPLOYEE
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='grid grid-cols-2 w-75'>
                    <div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">Email ID</label>
                            <input
                                type="email"
                                name="emailid"
                                value={formData.emailid}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter email id'
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">Emp ID</label>
                            <input
                                type="text"
                                name="usercode"
                                value={formData.usercode}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter employee id'
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">User ID</label>
                            <input
                                type="text"
                                name="usercode"
                                value={formData.usercode}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter user id'
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter last name'
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">Phone No</label>
                            <input
                                type="tel"
                                name="mobno"
                                value={formData.mobno}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter phone no'
                            />
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">Role</label>
                            <select
                                name="roleid"
                                value={formData.roleid}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center mb-2">
                            <label className="w-1/6 font-medium mr-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter Password'
                            />
                        </div>
                    </div>
                </div>

                   <div className='mt-7'>
                <div className='text-xl font-semibold text-orange-400 mb-4'>
                    ROLES & RIGHTS
                </div>
                <div className='ml-9'>
                    <table>
                        <thead>
                            <tr className='grid grid-cols-6 gap-3'>
                                <th> </th>
                                <th>All</th>
                                <th>Create</th>
                                <th>Read</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(rights).map((module) => (
                                <tr key={module} className='grid grid-cols-6 gap-4 justify-center'>
                                    <td>{module}</td>
                                    <td>
                                        <input
                                            type='checkbox'
                                            className='ml-5 w-[25px] h-[25px]'
                                            checked={allRights[module]}
                                            onChange={() => handleAllRightsChange(module)}
                                        />
                                    </td>
                                    {['Create', 'Read', 'Update', 'Delete'].map((action, index) => (
                                        <td key={action}>
                                            {Object.keys(rights[module]).some(rightId => 
                                                rights[module][rightId] !== undefined && 
                                                getRightName(parseInt(rightId)) === action
                                            ) && (
                                                <input
                                                    type='checkbox'
                                                    className='ml-5 w-[25px] h-[25px]'
                                                    checked={Object.entries(rights[module]).some(([rightId, selected]) => 
                                                        getRightName(parseInt(rightId)) === action && selected
                                                    )}
                                                    onChange={() => handleIndividualRightChange(module, 
                                                        Object.keys(rights[module]).find(rightId => 
                                                            getRightName(parseInt(rightId)) === action
                                                        )
                                                    )}
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


                <div className='mt-4'>
                    <Link href="/warehouse/warehouses/staff">
                        <button className='bg-blue-950 text-white m-1 px-4 py-2 rounded'>Cancel</button>
                    </Link>
                    <button type="submit" className='bg-orange-400 text-white px-4 py-2 rounded'>Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
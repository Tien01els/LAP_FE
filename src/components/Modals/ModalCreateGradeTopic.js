import React from 'react'
import Modal from 'react-modal'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

import { API_URL, customStyles } from '../../constant'
import Button from '../Button'
import { useState } from 'react'
import { toast } from 'react-toastify'

import createAxiosJWT from '../../createAxiosJWT'
import { useEffect } from 'react'
const axiosJWT = createAxiosJWT()

const ModalCreateGradeTopic = ({ isOpen, setIsOpen, getTopicOfGrade }) => {
  const {
    register: registerCreateGradeTopic,
    handleSubmit: handleSubmitGradeTopic,
    reset: resetCreate,
    formState: formStateCreate,
    watch,
    control,
  } = useForm()
  let watchGrade = watch('gradeId')

  const [grades, setGrades] = useState([])
  const [prerequisiteTopicGrades, setPrerequisiteTopicGrades] = useState([])

  const getAllGrades = async () => {
    try {
      const res = await axiosJWT.get(API_URL + `grade/teacher`)
      setGrades(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllGrades()
  }, [])

  const getPrerequisiteTopicOfGrade = async () => {
    // const res = await axiosJWT.get(
    //   API_URL + `topic/teacher/grade/${currentGrade}`,
    // )
    try {
      const res = await axiosJWT.get(
        API_URL + `topic/teacher/grade/${watchGrade?.id}`,
      )
      setPrerequisiteTopicGrades(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPrerequisiteTopicOfGrade()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchGrade])

  const handleCreateGradeTopic = async (data) => {
    try {
      console.log(data.isLock)
      const prerequisiteTopic = data.prerequisiteTopicId?.id
        ? {
            prerequisiteTopicId: data.prerequisiteTopicId.id,
          }
        : {}
      const topic = {
        topicName: data.topicName,
        description: data.description,
        gradeId: data.gradeId.id,
        isUnlock: !data.isLock,
        ...prerequisiteTopic,
      }
      await axiosJWT.post(API_URL + `topic`, topic)
      getTopicOfGrade()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
      toast('Create topic failed')
    }
  }
  useEffect(() => {
    if (formStateCreate.isSubmitSuccessful) {
      resetCreate({
        topicName: '',
        description: '',
        gradeId: -1,
        prerequisiteTopicId: -1,
      })
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStateCreate, resetCreate])
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form
        className="flex flex-col w-[500px] "
        onSubmit={handleSubmitGradeTopic(handleCreateGradeTopic)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <h2 className="text-2xl font-semibold">Create new topic</h2>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="topicName">Topic name</label>
            <input
              type="text"
              name="topicName"
              placeholder="Enter topic name"
              className="outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary"
              {...registerCreateGradeTopic('topicName', { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Topic description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              className="resize-none outline-none px-3 py-1 border-b-2  border-opacity-0 transition-all focus:border-primary"
              {...registerCreateGradeTopic('description', { required: true })}
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <input
              id="lockTopicCreate"
              type="checkbox"
              {...registerCreateGradeTopic('isLock')}
            />
            <label
              htmlFor="lockTopicCreate"
              className="select-none cursor-pointer"
            >
              Lock topic
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gradeId">Grade</label>
            <Controller
              name="gradeId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  options={grades}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.gradeName}
                  styles={{
                    menuList: (base) => ({
                      ...base,
                      maxHeight: '100px', // your desired height
                    }),
                  }}
                ></Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="prerequisiteTopicId">Prerequisite topic</label>
            {prerequisiteTopicGrades?.length > 0 && (
              <Controller
                name="prerequisiteTopicId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={prerequisiteTopicGrades}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.topicName}
                    styles={{
                      menuList: (base) => ({
                        ...base,
                        maxHeight: '160px', // your desired height
                      }),
                    }}
                    // menuPlacement='top'
                  ></Select>
                )}
              ></Controller>
            )}
          </div>
        </div>
        <Button className="border-none bg-primary w-full mt-5">Create</Button>
      </form>
    </Modal>
  )
}

export default ModalCreateGradeTopic

import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel } from '@headlessui/react'
import { Fragment } from 'react'
import EventListing  from '../EventListing'
import { GardenEvent } from '../Events'

interface Props {
  dayString: string;
  isOpen: boolean;
  closeModal: () => void;
  dayEvents: GardenEvent[];
  selectedDate: string;
}

export default function EventsModal(props: Props) {
  const yearMonthDate: string[] = props.selectedDate.split('-');
  const dateArray: string[] = new Date(+yearMonthDate[0], +yearMonthDate[1], +yearMonthDate[2]).toString().split(' ');
  const readableDate: string = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25"></div>
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center" style={{paddingRight: '28px'}}>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel style={{ maxWidth: '625px'}} className="w-full modal-size transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="">
                      <button
                        type="button"
                        className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={props.closeModal}
                        style={{color: 'red', textAlign: 'right', marginLeft: '95%', borderRadius: '40%', fontWeight: 'bold'}}
                      >
                        X
                      </button>
                    </div>
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                      style={{textAlign: 'center'}}
                    >
                      {readableDate}
                    </DialogTitle>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        {props.dayEvents.map((event, index) => <div key={`day_event_${index}`}><EventListing selectedDate={props.selectedDate} dayString={props.dayString} event={event}/></div>)}
                      </div>
                    </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

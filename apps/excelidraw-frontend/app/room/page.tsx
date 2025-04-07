"use client"
import { useEffect, useState } from "react"
import roomService from "../service/roomService"
import router from "next/router"

export default function Room(){
    const [rooms,setRooms]=useState<any[]>([])
    const [allRooms,setAllRooms]=useState<any[]>([])
    const [searchTerm,setSearchTerm]=useState<any[]>([])
    const [isModalOpen,setIsModalOpen]=useState<boolean>(false)
    const [roomName,setRoomName]=useState<string>("")
    useEffect(()=>{
        roomService.getRooms().then((res)=>{
            setRooms(res.rooms)
        })
        roomService.getAllRooms().then((res)=>{
            setAllRooms(res.rooms)
        })
    },[roomName,isModalOpen])
    return(
        <div className="min-h-screen bg-black p-8">
            {/* My Rooms Section */}
            <div className="flex flex-row gap-8">
                {/* My Rooms Section - Left 50% */}
                <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto pr-4" style={{scrollbarWidth: 'thin', scrollbarColor: '#4f46e5 #1f2937'}}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">My Rooms</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search my rooms..."
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
                            />
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {rooms.map((room) => (
                            <div key={room.id} className="w-full">
                                <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-indigo-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">{room.slug}</h3>
                                        <span className="bg-indigo-900 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full">Owner</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex-grow mr-2" onClick={()=>{
                                                window.location.href= `/Canvas/${room.id}`
                                            }}>
                                                Enter Room
                                            </button>
                                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other Rooms Section - Right 50% */}
                <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto pl-4" style={{scrollbarWidth: 'thin', scrollbarColor: '#059669 #1f2937'}}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Other Rooms</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search other rooms..."
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-500"
                                onChange={(e) => {
                                    const searchTerm = e.target.value.toLowerCase();
                                    const filtered = allRooms.filter(room => 
                                        room.slug.toLowerCase().includes(searchTerm)
                                    );
                                    setSearchTerm(filtered);
                                }}
                            />
                            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {allRooms.map((room) => (
                            <div key={room.id} className="w-full">
                                <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-emerald-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">{room.slug}</h3>
                                        <span className="bg-emerald-900 text-emerald-300 text-xs font-medium px-3 py-1 rounded-full">Guest</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex-grow mr-2" onClick={()=>{
                                                window.location.href = `/Canvas/${room.id}`
                                            }}> 
                                                Join Room
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Room Button */}
            <div className="fixed bottom-8 right-8">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white/90 backdrop-blur-md rounded-lg p-8 max-w-md w-full transform transition-all duration-300 ease-in-out animate-modal-fade-in">
                            <h2 className="text-2xl font-bold mb-4">Create New Room</h2>
                            <input
                                type="text"
                                placeholder="Enter room name"
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (roomName.trim()) {
                                            roomService.createRoom(roomName).then((res) => {
                                                if (res.success) {
                                                    setIsModalOpen(false)
                                                    // window.location.reload();
                                                }
                                            });
                                        }
                                    }}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                                >
                                    Create Room
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { GiProgression, GiPodium } from 'react-icons/gi'
import { ImDatabase } from 'react-icons/im'
import { MdDeveloperBoard } from 'react-icons/md'

export const SidebarData = [
  {
    path: '/playground',
    icon: <FaPlayCircle size='2x' />,
    className: 'sidebar-icon tooltip ',
    toolTipText: 'PlayGround',
  },
  {
    path: '/dancebase',
    icon: <ImDatabase size='2x' />,
    className: 'sidebar-icon tooltip ',
    toolTipText: 'Dance Base',
  },
  {
    path: '/progress',
    icon: <GiProgression size='2x' />,
    className: 'sidebar-icon tooltip ',
    toolTipText: 'Progress',
  },
  {
    path: '/developer',
    icon: <MdDeveloperBoard size='2x' />,
    className: 'sidebar-icon tooltip ',
    toolTipText: 'Dev Mode',
  },
]

import { useEditor } from '@craftjs/core'
import { Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'

// import ButtonSvg from '../../../public/icons/toolbox/button.svg';
// import SquareSvg from '../../../public/icons/toolbox/rectangle.svg';
// import TypeSvg from '../../../public/icons/toolbox/text.svg';
// import YoutubeSvg from '../../../public/icons/toolbox/video-line.svg';
// import { Button } from '../../selectors/Button';
// import { Container } from '../../selectors/Container';
// import { Text } from '../../selectors/Text';
// import { Video } from '../../selectors/Video';
import Banner1 from '../../selectors/Banner1'
import Banner2 from '../../selectors/Banner2'

// import video from '../../selectors/Video/video.png';
import bannerImage1 from '../../selectors/Banner1/preview.png'
import bannerImage2 from '../../selectors/Banner2/preview.png'

// import SquareIcon from '../../../public/icons/square.svg';
import { SidebarItem } from '../Viewport/Sidebar/SidebarItem'

import SquareIcon from '@material-ui/icons/CropSquare'

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  const [toolbarVisible, setToolbarVisible] = useState(true)
  const [toolbar2Visible, setToolbar2Visible] = useState(true)

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-48 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        {/* <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <img src={video} width="600px" height="300px"/>
            </Item>
          </Tooltip>
        </div> */}

        <SidebarItem
          icon={SquareIcon}
          title="Banners"
          // height={'full'}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <div ref={(ref) => create(ref, <Banner1 />)}>
            <Tooltip title="Banner 1" placement="right">
              <Item className="m-2 pb-2 cursor-pointer block" move>
                <img src={bannerImage1} width="600px" height="300px" />
              </Item>
            </Tooltip>
          </div>
          <div ref={(ref) => create(ref, <Banner2 />)}>
            <Tooltip title="Banner 2" placement="right">
              <Item className="m-2 pb-2 cursor-pointer block" move>
                <img src={bannerImage2} width="600px" height="300px" />
              </Item>
            </Tooltip>
          </div>
        </SidebarItem>

        <SidebarItem
          icon={SquareIcon}
          title="CTA"
          // height={'full'}
          visible={toolbar2Visible}
          onChange={(val) => setToolbar2Visible(val)}
        >
          <div ref={(ref) => create(ref, <Banner1 />)}>
            <Tooltip title="CTA 1" placement="right">
              <Item className="m-2 pb-2 cursor-pointer block" move>
                <img src={bannerImage1} width="600px" height="300px" />
              </Item>
            </Tooltip>
          </div>
          <div ref={(ref) => create(ref, <Banner2 />)}>
            <Tooltip title="CTA 2" placement="right">
              <Item className="m-2 pb-2 cursor-pointer block" move>
                <img src={bannerImage2} width="600px" height="300px" />
              </Item>
            </Tooltip>
          </div>
        </SidebarItem>
      </div>
    </ToolboxDiv>
  )
}

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from '@chakra-ui/react';
  import { FC, useState } from 'react';
  import { GeoloniaMap } from '@geolonia/embed-react';
  
  type Props = {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (lat: string, lng: string) => void;
    initialLat: string | undefined;
    initialLng: string | undefined;
  };
  
  export const MapEditorModal: FC<Props> = ({
    isOpen,
    onClose,
    onComplete,
    initialLat,
    initialLng,
  }) => {
    const [lat, setLat] = useState<string>(initialLat || '35.681236');
    const [lng, setLng] = useState<string>(initialLng || '139.767125');
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent mx="1rem">
          <ModalHeader backgroundColor={'#B9C5D3'}>緯度と経度の調整</ModalHeader>
          <ModalBody pb={6}>
            <GeoloniaMap
              style={{ height: '500px', width: '100%' }}
              className="geolonia"
              lat={lat}
              lng={lng}
              zoom="16"
              customMarker="draggable"
              geolocateControl="on"
              onLoad={(map) => {
                map.on('move', function () {
                  const center = map.getCenter();
                  setLat(center.lat);
                  setLng(center.lng);
                });
              }}
            />
            <Box display="flex" alignItems="center" pt={3}>
              <FormControl width={'30%'}>
                <FormLabel>緯度</FormLabel>
                <Input placeholder="緯度" value={lat} readOnly />
              </FormControl>
              <FormControl width={'30%'} ml={4}>
                <FormLabel>経度</FormLabel>
                <Input placeholder="経度" value={lng} readOnly />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal" variant="outline">
              調整をやめる
            </Button>
            <Button onClick={() => onComplete(lat, lng)} colorScheme="blue" ml={3}>
              保存して閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
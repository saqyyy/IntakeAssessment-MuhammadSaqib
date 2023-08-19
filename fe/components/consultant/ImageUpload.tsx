import { Group, Image, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { apiEndpoints } from '../../config/apiConfig';
import { ImageUploadProps } from '../../interfaces';
import { imageUpload } from '../../styles';
import { FIVE_MB } from '../../utils/contstants';

export function ImageUpload(props: Partial<ImageUploadProps>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [iamgePreview, setImagePreview] = useState<string | null>();

  const { classes } = imageUpload();

  const theme = useMantineTheme();

  const fileUploadHandler = async (file: File[]) => {
    try {
      setLoading(true);
      const previewUrl: any = URL.createObjectURL(file[0]);
      setImagePreview(previewUrl);
  
      const formData  = new FormData();
      formData.append('file', file[0]);
  
      const res = await fetch(apiEndpoints.uploadImage, {
        method: 'POST',
        body: formData,
      })
      const { filename } = await res.json();
      props.getImageName(filename);
    } catch(e) {
      console.log(e.message);      
    } finally {
      setLoading(false);
    }
    
  }
  return (
    <Dropzone
      loading = {loading}
      onDrop={fileUploadHandler}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={FIVE_MB}
      accept={IMAGE_MIME_TYPE}
      maxFiles={1}
      multiple={false}
      {...props}
    >
      <Group position="center" spacing="xl" className={classes.imageUploadWrapper}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          
          {iamgePreview ? <Image src={iamgePreview || ''}/> :
          <IconPhoto size="3.2rem" stroke={1.5} /> }
        </Dropzone.Idle>

        {!iamgePreview && <div>
          <Text size="xl" inline>
            Drag image here or click to select file
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attachment file should not exceed 5mb
          </Text>
        </div>}
      </Group>
    </Dropzone>
  );
}

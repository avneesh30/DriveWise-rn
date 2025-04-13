import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';

const MyCard = ({ title, content }) => {
  return (
    <Box
      backgroundColor="$white"
      borderRadius={10}
      shadowColor="#000"
      shadowOffset={{
        width: 0,
        height: 2,
      }}
      shadowOpacity={0.25}
      shadowRadius={3.84}
      elevation={5}
      p="$4"
    >
      <Box
        pb="$2"
      >
        <Text
          fontWeight="$bold"
          size="xl"
        >
          {title}
        </Text>
      </Box>
      <Text>
        {content}
      </Text>
    </Box>
  );
};
export default MyCard;
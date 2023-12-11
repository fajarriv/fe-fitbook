// Navbar.js

import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

const Navbar = ({ userName }) => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="#0C4C4C" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          FitBook
        </Text>
      </Flex>

      <Box display={{ base: 'none', md: 'block' }}>
        <Button variant="ghost" colorScheme="whiteAlpha">
          Home
        </Button>
        {/* ... other navigation buttons */}
      </Box>

      <Flex alignItems="center">
        <Menu>
          <MenuButton as={Button} variant="ghost" colorScheme="whiteAlpha">
            {userName || 'User'}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => /* navigate to /profile */}>Profile</MenuItem>
            <MenuItem onClick={() => /* navigate to /dashboard */}>Dashboard</MenuItem>
            <MenuItem onClick={() => /* navigate to /sessions */}>Sessions</MenuItem>
            <MenuItem onClick={() => /* navigate to /qa */}>Q&A</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;

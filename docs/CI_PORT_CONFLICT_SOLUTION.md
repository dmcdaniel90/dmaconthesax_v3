# CI Port Conflict Solution

## Problem
The GitHub Actions CI pipeline was failing with "port already in use" errors during performance testing. This occurred because:

1. The `build` job starts a server on port 3001 for testing
2. The `performance` job also tries to start a server on port 3001
3. The background processes from the `build` job weren't properly cleaned up
4. This caused port conflicts when Lighthouse CI tried to start its own server

## Solution

### 1. Port Separation
- **Build Job**: Uses port 3001 for production build testing
- **Performance Job**: Uses port 3002 for Lighthouse CI testing
- This eliminates port conflicts between jobs

### 2. Robust Port Cleanup
Created `scripts/cleanup-ports.sh` that:
- Kills any existing processes on a specified port
- Uses `lsof` to find processes using the port
- Falls back to `netstat` if `lsof` is not available
- Provides clear logging of cleanup actions

### 3. Enhanced Process Management
- Added proper process ID tracking (`SERVER_PID`)
- Implemented graceful shutdown with `if: always()` conditions
- Added verification steps to ensure servers are running
- Increased timeouts for more reliable startup

### 4. Multiple Configuration Files
- `lighthouse.config.js`: For general use (port 3001)
- `lighthouse.config.performance.js`: For CI performance testing (port 3002)

## Files Modified

### CI Workflow (`.github/workflows/ci.yml`)
- Added port cleanup steps before starting servers
- Separated ports between build (3001) and performance (3002) jobs
- Enhanced process management and cleanup
- Added server verification steps

### Lighthouse Configuration
- `lighthouse.config.js`: Updated with longer timeouts and multiple runs
- `lighthouse.config.performance.js`: New config for CI with port 3002

### Scripts
- `scripts/cleanup-ports.sh`: Robust port cleanup utility
- `scripts/start-server-ci.js`: Alternative robust server starter (optional)

### Package.json
- Added `start:ci-robust` script for alternative server starting

## Usage

### Manual Port Cleanup
```bash
# Clean up port 3001
./scripts/cleanup-ports.sh 3001

# Clean up port 3002
./scripts/cleanup-ports.sh 3002
```

### Local Testing
```bash
# Test with port 3001
PORT=3001 pnpm start:ci

# Test with port 3002
PORT=3002 pnpm start:ci
```

## Benefits

1. **Eliminates Port Conflicts**: Different jobs use different ports
2. **Robust Cleanup**: Ensures ports are free before starting servers
3. **Better Error Handling**: Clear logging and verification steps
4. **Reliable CI**: More consistent performance test results
5. **Maintainable**: Clear separation of concerns and documentation

## Testing

The solution has been tested to ensure:
- ✅ Port cleanup works correctly
- ✅ Servers start on assigned ports
- ✅ Lighthouse CI can connect to the correct port
- ✅ Processes are properly cleaned up after tests
- ✅ No port conflicts between jobs

## Future Improvements

1. Consider using Docker containers for complete isolation
2. Add health checks with retry logic
3. Implement port allocation from a pool of available ports
4. Add monitoring for CI performance metrics

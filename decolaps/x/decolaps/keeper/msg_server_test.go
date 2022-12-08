package keeper_test

import (
	"context"
	"testing"

	keepertest "decolaps/testutil/keeper"
	"decolaps/x/decolaps/keeper"
	"decolaps/x/decolaps/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.DecolapsKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}

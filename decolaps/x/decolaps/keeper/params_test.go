package keeper_test

import (
	"testing"

	testkeeper "decolaps/testutil/keeper"
	"decolaps/x/decolaps/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.DecolapsKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}

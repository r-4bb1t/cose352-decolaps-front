package decolaps_test

import (
	"testing"

	keepertest "decolaps/testutil/keeper"
	"decolaps/testutil/nullify"
	"decolaps/x/decolaps"
	"decolaps/x/decolaps/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.DecolapsKeeper(t)
	decolaps.InitGenesis(ctx, *k, genesisState)
	got := decolaps.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
